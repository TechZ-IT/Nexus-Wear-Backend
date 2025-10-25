import { BaseEntity } from 'src/common/entities/Base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SubDistrict } from './subdistrict.entity';

@Entity('district')
export class District extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => SubDistrict, (subDistrict) => subDistrict.district)
  subDistrict: SubDistrict[];
}

