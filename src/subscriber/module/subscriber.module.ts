import { Module } from '@nestjs/common';
import { SubscriberService } from '../service/subscriber.service';
import { SubscriberController } from '../controller/subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from '../entity/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  providers: [SubscriberService],
  controllers: [SubscriberController],
})
export class SubscriberModule {}
