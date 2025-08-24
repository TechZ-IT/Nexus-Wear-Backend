// src/roles/dto/update-role.dto.ts
import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    example: 'senior_manager',
    description: 'Updated name of the role',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Updated role description',
    description: 'Updated description of the role',
  })
  @IsOptional()
  @IsString()
  description?: string;

}
