import { ApiProperty } from '@nestjs/swagger';

export class CanalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  length: string;

  @ApiProperty()
  ways: string;

  @ApiProperty()
  direction: string;

  @ApiProperty()
  is_close: boolean;

  @ApiProperty()
  size: string;
}
