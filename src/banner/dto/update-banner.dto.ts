import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBannerDto {
  @ApiPropertyOptional({
    example: 'Flash Sale',
    description: 'Title of the banner',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'description of the banner based on title',
    description: 'Description of the banner',
  })
  @IsOptional()
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
