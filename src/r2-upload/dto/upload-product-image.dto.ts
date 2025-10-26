import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadProductImageDto {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Product image file to upload',
  })
  @IsOptional()
  file?: Express.Multer.File;
}
