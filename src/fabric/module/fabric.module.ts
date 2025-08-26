import { Module } from '@nestjs/common';
import { FabricController } from '../controller/fabric.controller';
import { FabricService } from '../service/fabric.service';

@Module({
  controllers: [FabricController],
  providers: [FabricService]
})
export class FabricModule {}
