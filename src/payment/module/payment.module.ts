import { Module } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { PaymentController } from '../controller/payment.controller';
import { Payment } from '../entity/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
