import { Module } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { CartController } from '../controller/cart.controller';

@Module({
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
