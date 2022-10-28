import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CanalsService } from './canals.service';
import { CreateCanalDto } from './dto/create-canal.dto';
import { UpdateCanalDto } from './dto/update-canal.dto';

@Controller('canals')
export class CanalsController {
  constructor(private readonly canalsService: CanalsService) {}

  @Post()
  create(@Body() createCanalDto: CreateCanalDto) {
    return this.canalsService.create(createCanalDto);
  }

  @Get()
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
}
