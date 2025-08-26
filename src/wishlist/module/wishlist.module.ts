import { Module } from '@nestjs/common';
import { WishlistService } from '../service/wishlist.service';
import { WishlistController } from '../controller/wishlist.controller';

@Module({
  providers: [WishlistService],
  controllers: [WishlistController]
})
export class WishlistModule {}
