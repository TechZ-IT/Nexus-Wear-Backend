import { BaseEntity } from 'src/common/entities/Base.entity';
import { Column, Entity } from 'typeorm';

@Entity('banner')
export class Banner extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  buttonText: string;

  @Column()
  image: string;
}
