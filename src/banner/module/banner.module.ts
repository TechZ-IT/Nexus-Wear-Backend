import { Module } from '@nestjs/common';
import { BannerService } from '../service/banner.service';
import { BannerController } from '../controller/banner.controller';
import { Banner } from '../entity/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';
import { AuthModule } from 'src/auth/module/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), R2UploadModule, AuthModule],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
