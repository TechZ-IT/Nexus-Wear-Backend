import { Module } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
