import { Module } from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { AddressController } from '../controller/address.controller';

@Module({
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
