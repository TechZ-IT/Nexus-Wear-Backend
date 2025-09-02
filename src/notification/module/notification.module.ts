import { Module } from '@nestjs/common';
import { NotificationController } from '../controller/notification.controller';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../entity/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
