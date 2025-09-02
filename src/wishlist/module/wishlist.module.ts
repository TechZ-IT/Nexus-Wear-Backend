import { Module } from '@nestjs/common';
import { WishlistService } from '../service/wishlist.service';
import { WishlistController } from '../controller/wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from '../entity/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}
