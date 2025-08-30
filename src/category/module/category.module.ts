import { Module } from '@nestjs/common';
import { CategoryController } from '../controller/category.controller';
import { CategoryService } from '../service/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), R2UploadModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
