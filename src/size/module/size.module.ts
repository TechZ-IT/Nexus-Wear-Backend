import { Module } from '@nestjs/common';
import { SizeService } from '../service/size.service';
import { SizeController } from '../controller/size.controller';
import { Size } from '../entity/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Size]), R2UploadModule],
  providers: [SizeService],
  controllers: [SizeController],
})
export class SizeModule {}
