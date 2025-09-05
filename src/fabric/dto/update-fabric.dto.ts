import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFabricDto {
  @ApiPropertyOptional({
    example: 'Red',
    description: 'fabric name should be here',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'here is the red fabric',
    description: 'fabric description should be here',
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
