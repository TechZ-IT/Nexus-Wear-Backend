import { Module } from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { AddressController } from '../controller/address.controller';
import { Address } from '../entity/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
