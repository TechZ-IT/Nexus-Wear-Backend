import { Module } from '@nestjs/common';
import { SizeService } from '../service/size.service';
import { SizeController } from '../controller/size.controller';

@Module({
  providers: [SizeService],
  controllers: [SizeController]
})
export class SizeModule {}
