import { BaseEntity } from 'src/common/entities/Base.entity';
import { Entity } from 'typeorm';

@Entity('wishlist')
export class Wishlist extends BaseEntity {}