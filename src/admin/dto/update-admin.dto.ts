import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @ApiPropertyOptional({
    example: 'Mr Admin',
    description: 'Admin name should be here',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiPropertyOptional({
    example: '123456',
    description: 'Admin password should be here',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: '01234567890',
    description: 'Admin number should be here',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Enter here admin role id ',
  })
  @IsOptional()
  @IsNumber()
  roleId: number;
}
