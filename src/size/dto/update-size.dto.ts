import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSizeDto {
  @ApiPropertyOptional({
    example: 'Red',
    description: 'Size name should be here',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'here is the red Size',
    description: 'Size description should be here',
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
