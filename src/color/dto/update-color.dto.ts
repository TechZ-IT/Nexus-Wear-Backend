import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateColorDto {
  @ApiPropertyOptional({
    example: 'Red',
    description: 'color name should be here',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'here is the red color',
    description: 'color description should be here',
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
}
