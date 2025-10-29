import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';
import { PaymentStatus, PaymentType } from 'src/common/types/status.enum';
import { Order } from 'src/order/entity/order.entity';
import { OrderService } from 'src/order/service/order.service';
import Stripe from 'stripe';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import * as qs from 'qs';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    private readonly configService: ConfigService,
    private readonly orderService: OrderService,
  ) {
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
    }
    this.stripe = new Stripe(stripeKey);
  }

  // Initiate payment — creates order automatically then initiates payment

  async initiatePayment(createOrderDto: CreateOrderDto) {
    //  Create the Order first
    const order = await this.orderService.createOrder(createOrderDto);
    if (!order) throw new BadRequestException('Order creation failed');

    //  Prepare Payment entity
    let payment = this.paymentRepo.create({
      email: order.email,
      name: order.name,
      phoneNumber: order.phoneNumber,
      addressLine: order.addressLine,
      transactionId: `TXN-${Date.now()}`,
      paymentType: order.paymentType,
      amount: order.totalAmount,
      orderId: order.id,
      customerId: order.customerId,
    });

    payment = await this.paymentRepo.save(payment);

    // Initiate payment according to type
    switch (order.paymentType) {
      case PaymentType.STRIPE:
        return this.createStripePayment(payment);

      case PaymentType.PAYPAL:
        return this.createPayPalPayment(payment);

      case PaymentType.SSL:
        return this.createSSLPayment(payment);

      case PaymentType.COD:
        payment.status = PaymentStatus.PENDING;
        await this.paymentRepo.save(payment);
        return { message: 'Cash on Delivery confirmed', payment };

      default:
        throw new BadRequestException('Invalid payment type');
    }
  }

  // Stripe Payment
  private async createStripePayment(payment: Payment) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?transactionId=${payment.transactionId}`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel`,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: `Order #${payment.orderId}` },
              unit_amount: Math.round(payment.amount * 100),
            },
            quantity: 1,
          },
        ],
        metadata: { transactionId: payment.transactionId },
      });

      return { url: session.url, payment };
    } catch (err) {
      throw new InternalServerErrorException(
        'Stripe Payment Error: ' + err.message,
      );
    }
  }

  // PayPal Payment

  private async createPayPalPayment(payment: Payment) {
    try {
      const PAYPAL_CLIENT = this.configService.get('PAYPAL_CLIENT_ID');
      const PAYPAL_SECRET = this.configService.get('PAYPAL_SECRET');
      const PAYPAL_API = this.configService.get('PAYPAL_API_URL');

      const auth = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`).toString(
        'base64',
      );

      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: payment.amount,
              },
            },
          ],
          application_context: {
            return_url: `${this.configService.get('FRONTEND_URL')}/payment/success?transactionId=${payment.transactionId}`,
            cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel`,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
          },
        },
      );

      const approvalUrl = response.data.links.find(
        (link: any) => link.rel === 'approve',
      ).href;

      return { url: approvalUrl, payment };
    } catch (err) {
      throw new InternalServerErrorException(
        'PayPal Payment Error: ' + err.message,
      );
    }
  }

  // SSL Payment

  private async createSSLPayment(payment: Payment) {
    try {
      const storeId = this.configService.get('SSL_STORE_ID');
      const storePass = this.configService.get('SSL_STORE_PASSWORD');
      const sslUrl = this.configService.get('SSL_INIT_URL');

      const postData = {
        store_id: storeId,
        store_passwd: storePass,
        total_amount: payment.amount,
        currency: 'BDT',
        tran_id: payment.transactionId,
        success_url: `${this.configService.get('BACKEND_URL')}/payment/success?transactionId=${payment.transactionId}`,
        fail_url: `${this.configService.get('BACKEND_URL')}/payment/fail`,
        cancel_url: `${this.configService.get('BACKEND_URL')}/payment/cancel`,

        cus_name: payment.name,
        cus_email: payment.email,
        cus_phone: payment.phoneNumber,
        cus_add1: payment.addressLine,
        cus_city: 'Dhaka',
        cus_country: 'Bangladesh',

        // ✅ Shipping info
        shipping_method: 'Courier',
        ship_name: payment.name,
        ship_add1: payment.addressLine,
        ship_city: 'Dhaka',
        ship_country: 'Bangladesh',
        ship_postcode: '1205', // ✅ Required!

        product_name: `Order #${payment.orderId}`,
        product_category: 'General',
        product_profile: 'general',
      };

      const response = await axios.post(sslUrl, qs.stringify(postData), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });


      return { url: response.data.GatewayPageURL, payment };
    } catch (err) {
      throw new InternalServerErrorException(
        'SSL Payment Error: ' + err.message,
      );
    }
  }

  // Handle success callback

  async handleSuccess(transactionId: string) {
    const payment = await this.paymentRepo.findOne({
      where: { transactionId },
    });
    if (!payment) throw new BadRequestException('Payment not found');

    payment.status = PaymentStatus.SUCCESS;
    await this.paymentRepo.save(payment);

    // Update Order status
    await this.orderRepo.update(payment.orderId, { payment: 'paid' });

    return { message: 'Payment Successful', payment };
  }
}
