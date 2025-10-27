import { Module } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Category } from 'src/category/entity/category.entity';
import { Subcategory } from 'src/subcategory/entity/subcategory.entity';
import { Color } from 'src/color/entity/color.entity';
import { Size } from 'src/size/entity/size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Subcategory, Color, Size]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
