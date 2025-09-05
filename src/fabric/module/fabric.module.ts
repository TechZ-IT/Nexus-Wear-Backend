import { Module } from '@nestjs/common';
import { FabricController } from '../controller/fabric.controller';
import { FabricService } from '../service/fabric.service';
import { Fabric } from '../entity/fabric.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fabric]), R2UploadModule],
  controllers: [FabricController],
  providers: [FabricService],
})
export class FabricModule {}
