import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({
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
