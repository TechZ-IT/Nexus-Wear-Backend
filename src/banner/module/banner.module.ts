import { Module } from '@nestjs/common';
import { BannerService } from '../service/banner.service';
import { BannerController } from '../controller/banner.controller';

@Module({
  providers: [BannerService],
  controllers: [BannerController]
})
export class BannerModule {}
