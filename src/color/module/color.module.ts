import { Module } from '@nestjs/common';
import { ColorService } from '../service/color.service';
import { ColorController } from '../controller/color.controller';
import { Color } from '../entity/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Color]), R2UploadModule],
  providers: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
