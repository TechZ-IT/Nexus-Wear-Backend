import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from 'src/common/types/status.enum';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Wooden Chair Deluxe',
    description: 'Name of the product',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '["",""]',
    description: 'Name of the product',
    required: false,
  })
  @IsOptional()
  @IsArray()
  images: string[];

  @ApiPropertyOptional({
    example: 'PROD124',
    description: 'Unique product code',
  })
  @IsOptional()
  @IsString()
  productCode?: string;

  @ApiPropertyOptional({
    example: 'Updated description',
    description: 'Product description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 1500,
    description: 'Discounted or selling Price of the product',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: 1500,
    description: 'Real Price of the product',
  })
  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @ApiPropertyOptional({ example: 1500, description: 'Rating of the product' })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({
    enum: ProductStatus,
    example: ProductStatus.OUT_OF_STOCK,
    description: 'Product availability status',
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  availability?: ProductStatus;

  @ApiPropertyOptional({ example: 1, description: 'ID of the category' })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({ example: 2, description: 'ID of the subcategory' })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiPropertyOptional({ example: [1, 2], description: 'Array of color IDs' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  colorIds?: number[];

  @ApiPropertyOptional({ example: [1, 3], description: 'Array of size IDs' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  sizeIds?: number[];
}
