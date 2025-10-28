import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from '../service/payment.service';
import { PaymentType } from 'src/common/types/status.enum';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  @ApiOperation({ summary: 'Create Order and Initiate Payment' })
  @ApiBody({ type: CreateOrderDto })
  async initiatePayment(@Body() createOrderDto: CreateOrderDto) {
    return this.paymentService.initiatePayment(createOrderDto);
  }

  @Get('success')
  @ApiOperation({ summary: 'Handle successful payment callback' })
  async handleSuccess(@Query('transactionId') transactionId: string) {
    if (!transactionId)
      throw new BadRequestException('transactionId is required');
    return this.paymentService.handleSuccess(transactionId);
  }

  @Get('fail')
  @ApiOperation({ summary: 'Handle failed payment callback' })
  @ApiQuery({ name: 'transactionId', required: false, type: String })
  async handleFail(@Query('transactionId') transactionId?: string) {
    return {
      message: 'Payment Failed',
      transactionId: transactionId || null,
    };
  }

  @Get('cancel')
  @ApiOperation({ summary: 'Handle cancelled payment callback' })
  @ApiQuery({ name: 'transactionId', required: false, type: String })
  async handleCancel(@Query('transactionId') transactionId?: string) {
    return {
      message: 'Payment Cancelled by user',
      transactionId: transactionId || null,
    };
  }
}
