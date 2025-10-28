import { Module } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { Cart } from 'src/cart/entity/cart.entity';
import { CartItem } from 'src/cart/entity/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart, CartItem])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
