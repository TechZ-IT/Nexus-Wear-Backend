import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class LoginCustomerDto {
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
}
