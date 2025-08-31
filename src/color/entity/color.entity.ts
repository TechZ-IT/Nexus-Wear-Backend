import { BaseEntity } from 'src/common/entities/Base.entity';
import { Entity } from 'typeorm';

@Entity('color')
export class Color extends BaseEntity {}