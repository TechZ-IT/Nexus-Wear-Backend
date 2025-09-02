import { Module } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
