import { BaseEntity } from 'src/common/entities/Base.entity';
import { Subcategory } from 'src/subcategory/entity/subcategory.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategory: Subcategory[];
}
