import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateColorDto {
  @ApiPropertyOptional({
    example: 'Red',
    description: 'color name should be here',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'here is the red color',
    description: 'color description should be here',
  })
  description: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  image?: Express.Multer.File;
}
