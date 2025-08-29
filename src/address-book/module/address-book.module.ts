import { Module } from '@nestjs/common';
import { AddressBookService } from '../service/address-book.service';
import { AddressBookController } from '../controller/address-book.controller';

@Module({
  providers: [AddressBookService],
  controllers: [AddressBookController]
})
export class AddressBookModule {}
