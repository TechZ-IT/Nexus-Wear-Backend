import { Module } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { ContactController } from '../controller/contact.controller';

@Module({
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {}
