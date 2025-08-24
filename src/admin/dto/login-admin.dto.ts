import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email of the Admin',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of the Admin',
  })
  @IsString()
  password: string;
}
