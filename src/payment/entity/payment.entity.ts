import { BaseEntity } from 'src/common/entities/Base.entity';
import { Entity } from 'typeorm';

@Entity('payment')
export class Payment extends BaseEntity {}