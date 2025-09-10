import { BaseEntity } from 'src/common/entities/Base.entity';
import { Column, Entity } from 'typeorm';

@Entity('banner')
export class Banner extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'button_text' })
  buttonText: string;

  @Column({ name: 'button_redirect_url' })
  buttonRedirectUrl: string;

  @Column({ nullable: true })
  image?: string;
}
