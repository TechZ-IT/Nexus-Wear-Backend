import { Module } from '@nestjs/common';
import { SocialController } from '../controller/social.controller';
import { SocialService } from '../service/social.service';

@Module({
  controllers: [SocialController],
  providers: [SocialService]
})
export class SocialModule {}
