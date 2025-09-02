import { Module } from '@nestjs/common';
import { SizeService } from '../service/size.service';
import { SizeController } from '../controller/size.controller';
import { Size } from '../entity/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  providers: [SizeService],
  controllers: [SizeController]
})
export class SizeModule {}
