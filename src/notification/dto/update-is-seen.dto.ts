import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateIsSeenDto {
  @ApiProperty({
    description: 'Mark notification as seen or unseen',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isSeen: boolean;
}
