import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO for updating customer information.
 * Extends CreateCustomerDto so all fields are optional by default.
 */
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Updated customer image file',
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiPropertyOptional({
    example: 'New Secure Password',
    description: 'New password of the customer (will be rehashed)',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
