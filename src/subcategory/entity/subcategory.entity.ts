import { Category } from 'src/category/entity/category.entity';
import { BaseEntity } from 'src/common/entities/Base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('subcategory')
export class Subcategory extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image?: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.subcategory, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  category: Category;
}
