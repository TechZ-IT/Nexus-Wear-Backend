import { Module } from '@nestjs/common';
import { ColorService } from '../service/color.service';
import { ColorController } from '../controller/color.controller';

@Module({
  providers: [ColorService],
  controllers: [ColorController]
})
export class ColorModule {}
