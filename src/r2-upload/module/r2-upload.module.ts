import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { R2UploadService } from '../service/r2-upload.service';
import { FileValidationInterceptor } from '../interceptor/r2-upload.interceptor';
import { R2UploadController } from '../controller/r2-upload.controller';

@Module({
  imports: [ConfigModule],
  providers: [R2UploadService, FileValidationInterceptor],
  controllers: [R2UploadController],
  exports: [R2UploadService, FileValidationInterceptor],
})
export class R2UploadModule {}
