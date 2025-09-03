import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSubcategoryDto {
  @ApiPropertyOptional({
    example: 'shirt',
    description: 'category name should be here',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'description',
    description: 'category description should be here',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiPropertyOptional({
    example: 1,
    description: 'category id should be here',
  })
  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
