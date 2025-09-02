import { Module } from '@nestjs/common';
import { SocialController } from '../controller/social.controller';
import { SocialService } from '../service/social.service';
import { Social } from '../entity/social.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Social])],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
