import { BaseEntity } from 'src/common/entities/Base.entity';
import { Entity } from 'typeorm';

@Entity('subscriber')
export class Subscriber extends BaseEntity {}