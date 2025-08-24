import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Mr Admin',
    description: 'Admin name should be here',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Admin email should be here',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Admin password should be here',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '01234567890',
    description: 'Admin number should be here',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Enter here admin role id ',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  roleId: number;
}
