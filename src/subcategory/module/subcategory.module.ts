import { Module } from '@nestjs/common';
import { SubcategoryService } from '../service/subcategory.service';
import { SubcategoryController } from '../controller/subcategory.controller';

@Module({
  providers: [SubcategoryService],
  controllers: [SubcategoryController]
})
export class SubcategoryModule {}
