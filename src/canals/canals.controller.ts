import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { CanalsService } from './canals.service';
import { ICanal } from './canals.interface';
import { CreateCanalDto } from './dto/create-canal.dto';
import { SuggestCanalDto } from './dto/suggest-canal.dto';
import { UpdateCanalDto } from './dto/update-canal.dto';
import { CanalDto } from './dto/canal-dto';

@Controller('canals')
export class CanalsController {
  constructor(private readonly canalsService: CanalsService) {}

  @Post()
  create(@Body() createCanalDto: CreateCanalDto) {
    return this.canalsService.create(createCanalDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CanalDto,
  })
  findAll() {
    return this.canalsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCanalDto: UpdateCanalDto) {
    return this.canalsService.update(+id, updateCanalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canalsService.remove(+id);
  }

  @Post('/suggest-canal')
  suggestCanal(@Body() suggestCanalDto: SuggestCanalDto) {
    return this.canalsService.getAvailableCanal(suggestCanalDto);
  }
}
