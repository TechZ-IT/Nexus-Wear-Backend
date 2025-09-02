import { Module } from '@nestjs/common';
import { ReviewService } from '../service/review.service';
import { ReviewController } from '../controller/review.controller';
import { review } from '../entity/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([review])],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
