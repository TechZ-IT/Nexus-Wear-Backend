import { Module } from '@nestjs/common';
import { MaterialService } from '../service/material.service';
import { MaterialController } from '../controller/material.controller';

@Module({
  providers: [MaterialService],
  controllers: [MaterialController]
})
export class MaterialModule {}
