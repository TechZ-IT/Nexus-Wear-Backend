import { Module } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { ContactController } from '../controller/contact.controller';
import { Contact } from '../entity/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
