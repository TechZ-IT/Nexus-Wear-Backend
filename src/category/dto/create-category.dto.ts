import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
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

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image: Express.Multer.File;
}
