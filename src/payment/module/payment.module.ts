import { Module } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { PaymentController } from '../controller/payment.controller';
import { Payment } from '../entity/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
