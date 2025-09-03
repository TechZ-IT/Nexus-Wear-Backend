import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CustomerStatus } from 'src/common/types/status.enum';

export class CreateCustomerDto {
  @ApiPropertyOptional({
    example: 'Mr Customer',
    description: 'Name of the customer',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Customer image file',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiPropertyOptional({
    example: 'customer@gmail.com',
    description: 'Email of the customer',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '123456',
    description: 'Password of the customer',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'Phone number of the customer',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: '123 Main St, Dhaka, Bangladesh',
    description: 'Address of the customer',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'Dhaka',
    description: 'City of the customer',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: '1200',
    description: 'State of the customer',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: '1212',
    description: 'Zip code of the customer',
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiPropertyOptional({
    example: 'Bangladesh',
    description: 'Country of the customer',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    example: CustomerStatus,
    description: 'customer status enum',
    default: CustomerStatus.ACTIVE,
  })
  status?: CustomerStatus;
}
