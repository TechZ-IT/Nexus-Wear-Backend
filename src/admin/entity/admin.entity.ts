import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/Base.entity';
import { Role } from 'src/role/entity/role.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => Role, (role) => role.admins)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'role_id' })
  roleId: number;
}
