import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    description: 'Product ID linked to this cart item',
    example: 101,
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the selected product',
    example: 2,
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Size ID of the selected product',
    example: 3,
  })
  @IsInt()
  sizeId: number;

  @ApiProperty({
    description: 'Color ID of the selected product',
    example: 5,
  })
  @IsInt()
  colorId: number;

  @ApiProperty({
    description: 'Unit price of the product at the time of adding to cart',
    example: 499.99,
  })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}
