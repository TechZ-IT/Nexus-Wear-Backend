import { Module } from '@nestjs/common';
import { MaterialService } from '../service/material.service';
import { MaterialController } from '../controller/material.controller';
import { Material } from '../entity/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialService],
  controllers: [MaterialController],
})
export class MaterialModule {}
