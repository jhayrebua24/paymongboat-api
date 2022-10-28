import { CanalDirections, CanalTypes } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCanalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalTypes)
  size: CanalTypes;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalDirections)
  direction: CanalDirections;
}
