import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductStatus } from 'src/common/types/status.enum';

export class CreateProductDto {
  @ApiProperty({ example: 'Wooden Chair', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'PROD123',
    description: 'Unique product code',
    required: false,
  })
  @IsOptional()
  @IsString()
  productCode?: string;

  @ApiProperty({
    example: 'Comfortable wooden chair for living room',
    description: 'Product description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1200, description: 'Price of the product' })
  @IsNumber()
  price: number;

  @ApiProperty({
    enum: ProductStatus,
    example: ProductStatus.IN_STOCK,
    description: 'Product availability status',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  availability?: ProductStatus;

  @ApiProperty({ example: 1, description: 'ID of the category' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 2, description: 'ID of the subcategory' })
  @IsNumber()
  subcategoryId: number;

  @ApiProperty({
    example: [1, 2],
    description: 'Array of color IDs',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  colorIds?: number[];

  @ApiProperty({
    example: [1, 3],
    description: 'Array of size IDs',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  sizeIds?: number[];
}
