import { Module } from '@nestjs/common';
import { ColorService } from '../service/color.service';
import { ColorController } from '../controller/color.controller';
import { Color } from '../entity/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService],
  controllers: [ColorController],
})
export class ColorModule {}
