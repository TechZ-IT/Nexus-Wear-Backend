import { BaseEntity } from 'src/common/entities/Base.entity';
import { Entity } from 'typeorm';

@Entity('order')
export class Order extends BaseEntity {}