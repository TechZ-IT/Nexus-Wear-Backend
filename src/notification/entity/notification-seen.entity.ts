import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification_seen')
export class NotificationSeen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  notificationId: number;

  @Column()
  customerId: number;

  @Column({ type: 'boolean', default: true })
  isSeen: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
