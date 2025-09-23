import { Module } from '@nestjs/common';
import { FaqService } from '../service/faq.service';
import { FaqController } from '../controller/faq.controller';
import { FAQ } from '../entity/faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FAQ])],
  providers: [FaqService],
  controllers: [FaqController],
})
export class FaqModule {}
