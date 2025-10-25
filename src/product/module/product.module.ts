import { Module } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { R2UploadModule } from 'src/r2-upload/module/r2-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), R2UploadModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
