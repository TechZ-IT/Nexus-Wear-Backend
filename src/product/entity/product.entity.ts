import { ProductStatus } from 'src/common/types/status.enum';
import { FAQ } from 'src/faq/entity/faq.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  productCode?: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: ProductStatus.IN_STOCK })
  availability?: ProductStatus;

  @Column()
  categoryId: number;

  @Column()
  subcategoryId: number;

  // FAQ relationship
  @OneToMany(() => FAQ, (faq) => faq.product, { cascade: true })
  faqs: FAQ[];

  // Analytics
  @Column({ type: 'bigint', default: 0 })
  viewCount: number;

  @Column({ nullable: true })
  lastViewedAt: string;

  @Column({ type: 'bigint', default: 0 })
  orderCount: number;

  @Column({ nullable: true })
  lastOrderedAt: string;
}
