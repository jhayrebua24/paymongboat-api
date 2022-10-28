import { CanalDirections, ShipType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SuggestCanalDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ShipType)
  type: ShipType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalDirections)
  direction: CanalDirections;
}
