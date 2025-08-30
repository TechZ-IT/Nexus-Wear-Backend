import { Module } from '@nestjs/common';
import { SubcategoryService } from '../service/subcategory.service';
import { SubcategoryController } from '../controller/subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from '../entity/subcategory.entity';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory]), R2UploadModule],
  providers: [SubcategoryService],
  controllers: [SubcategoryController],
})
export class SubcategoryModule {}
