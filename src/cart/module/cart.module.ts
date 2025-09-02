import { Module } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { CartController } from '../controller/cart.controller';
import { Cart } from '../entity/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
