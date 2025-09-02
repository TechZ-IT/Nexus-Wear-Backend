import { Module } from '@nestjs/common';
import { BannerService } from '../service/banner.service';
import { BannerController } from '../controller/banner.controller';
import { Banner } from '../entity/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
