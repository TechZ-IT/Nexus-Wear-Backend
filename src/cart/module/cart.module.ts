import { Module } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { CartController } from '../controller/cart.controller';
import { Cart } from '../entity/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '../entity/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
