import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCanalDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  is_close: boolean;
}
