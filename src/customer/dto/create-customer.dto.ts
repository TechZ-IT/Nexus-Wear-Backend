import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'Mr Customer',
    description: 'Name of the customer',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Customer image file',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    example: 'customer@gmail.com',
    description: 'Email of the customer',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of the customer',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Phone number of the customer',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '123 Main St, Dhaka, Bangladesh',
    description: 'Address of the customer',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Dhaka',
    description: 'City of the customer',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: '1200',
    description: 'Zip code of the customer',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: '1212',
    description: 'Zip code of the customer',
  })
  @IsString()
  zipCode: string;

  @ApiProperty({
    example: 'Bangladesh',
    description: 'Country of the customer',
  })
  @IsString()
  country: string;
}
