import { Module } from '@nestjs/common';
import { NotificationController } from '../controller/notification.controller';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../entity/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationSeen } from '../entity/notification-seen.entity';
import { Role } from 'src/role/entity/role.entity';
import { AuthModule } from 'src/auth/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationSeen, Role]),
    AuthModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
