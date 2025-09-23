import { ProductStatus } from 'src/common/types/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'product_code' })
  productCode?: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: ProductStatus.IN_STOCK })
  availability?: ProductStatus;

  
}
