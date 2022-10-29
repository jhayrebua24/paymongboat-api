import { ApiProperty } from '@nestjs/swagger';
import { CanalDirections, ShipType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SuggestCanalDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ShipType)
  @ApiProperty()
  type: ShipType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalDirections)
  @ApiProperty()
  direction: CanalDirections;
}
