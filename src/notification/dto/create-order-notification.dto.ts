import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderNotificationDto {
  @ApiProperty({ example: 'Order Shipped' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Your order has been shipped.' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({ example: 101 })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
