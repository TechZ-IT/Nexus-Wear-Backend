import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/Base.entity';
import { CustomerStatus } from 'src/common/types/status.enum';
import { Order } from 'src/order/entity/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('customer')
export class Customer extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column()
  email?: string;

  @Column()
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ default: CustomerStatus.ACTIVE })
  status: CustomerStatus;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
