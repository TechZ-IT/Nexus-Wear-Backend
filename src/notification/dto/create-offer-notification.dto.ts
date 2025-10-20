import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferNotificationDto {
  @ApiProperty({ example: 'Special Offer!' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Get 20% discount on your next purchase.' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
