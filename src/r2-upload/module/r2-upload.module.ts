import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { R2UploadService } from '../service/r2-upload.service';
import { FileValidationInterceptor } from '../interceptor/r2-upload.interceptor';

@Module({
  imports: [ConfigModule],
  providers: [R2UploadService, FileValidationInterceptor],
  exports: [R2UploadService, FileValidationInterceptor],
})
export class R2UploadModule {}
