import { BaseEntity } from 'src/common/entities/Base.entity';
import { Column, Entity } from 'typeorm';

@Entity('material')
export class Material extends BaseEntity {
      @Column()
      name: string;
    
      @Column({ nullable: true })
      description?: string;
    
      @Column({ nullable: true })
      image?: string;
}
