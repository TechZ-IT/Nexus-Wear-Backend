import { BaseEntity } from 'src/common/entities/Base.entity';
import { Entity } from 'typeorm';

@Entity('address')
export class Address extends BaseEntity {}
