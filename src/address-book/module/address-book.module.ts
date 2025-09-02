import { Module } from '@nestjs/common';
import { AddressBookService } from '../service/address-book.service';
import { AddressBookController } from '../controller/address-book.controller';
import { District } from '../entity/district.entity';
import { SubDistrict } from '../entity/subdistrict';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([District, SubDistrict])],
  providers: [AddressBookService],
  controllers: [AddressBookController],
})
export class AddressBookModule {}
