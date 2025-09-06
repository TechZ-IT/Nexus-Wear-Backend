import { Module } from '@nestjs/common';
import { MaterialService } from '../service/material.service';
import { MaterialController } from '../controller/material.controller';
import { Material } from '../entity/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Material]), R2UploadModule],
  providers: [MaterialService],
  controllers: [MaterialController],
})
export class MaterialModule {}
