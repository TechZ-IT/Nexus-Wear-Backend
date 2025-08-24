
import { IsNotEmpty, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'manager',
    description: 'Name of the role',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Can manage certain resources but has limited permissions compared to admin',
    description: 'Description of the role',
  })
  @IsOptional()
  @IsString()
  description?: string;

}
