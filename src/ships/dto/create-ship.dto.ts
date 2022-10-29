import { ApiProperty } from '@nestjs/swagger';
import { CanalDirections, ShipType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShipDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  canal_route_id: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ShipType)
  @ApiProperty()
  type: ShipType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalDirections)
  @ApiProperty()
  direction: CanalDirections;
}
