import { CanalDirections } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { CanalTypes } from '../canals.interface';
import { CanalTypeValidator } from '../validators/CanalTypeValidator';

export class CreateCanalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Validate(CanalTypeValidator)
  size_id: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalDirections)
  direction: CanalDirections;
}
