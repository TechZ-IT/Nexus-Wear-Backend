import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({
    example: 'Flash Sale',
    description: 'Title of the banner',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'description of the banner based on title',
    description: 'Description of the banner',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    example: 'Shop Now',
    description: 'Button text of the banner',
  })
  @IsString()
  buttonText: string;

  @ApiPropertyOptional({
    example: 'Shop Now',
    description: 'Button text of the banner',
  })
  @IsString()
  buttonRedirectUrl: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image: Express.Multer.File;
}
