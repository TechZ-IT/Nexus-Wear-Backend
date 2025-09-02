import { Module } from '@nestjs/common';
import { FabricController } from '../controller/fabric.controller';
import { FabricService } from '../service/fabric.service';
import { Fabric } from '../entity/fabric.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fabric])],
  controllers: [FabricController],
  providers: [FabricService],
})
export class FabricModule {}
