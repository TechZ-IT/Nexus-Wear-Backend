import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/Base.entity';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity('customer')
export class Customer extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  country: string;
}
