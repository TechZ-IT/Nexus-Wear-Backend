import { BaseEntity } from 'src/common/entities/Base.entity';
import { Column, Entity } from 'typeorm';

@Entity('fabric')
export class Fabric extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image?: string;
}
