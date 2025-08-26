import { Module } from '@nestjs/common';
import { SubscriberService } from '../service/subscriber.service';
import { SubscriberController } from '../controller/subscriber.controller';

@Module({
  providers: [SubscriberService],
  controllers: [SubscriberController]
})
export class SubscriberModule {}
