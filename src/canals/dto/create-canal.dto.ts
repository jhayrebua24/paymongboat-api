import { ApiProperty } from '@nestjs/swagger';
import { CanalDirections } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { CanalTypeValidator } from '../validators/CanalTypeValidator';

export class CreateCanalDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Validate(CanalTypeValidator)
  @ApiProperty()
  @IsNumber()
  size_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  length: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CanalDirections)
  @ApiProperty()
  direction: CanalDirections;
}
