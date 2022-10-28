import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IWhereCanal } from 'src/canals/canals.interface';
import { CreateCanalDto } from './dto/create-canal.dto';
import { UpdateCanalDto } from './dto/update-canal.dto';

@Injectable()
export class CanalsService {
  constructor(private prisma: PrismaService) {}

  async checkIfCanalExist(name: string, id: number = null) {
    const where = {
      name,
    } as IWhereCanal;
    if (id)
      where.NOT = {
        id,
      };
    const count = await this.prisma.canals.count({
      where,
    });

    if (count > 0) return Promise.reject('Canal already exists');
    return Promise.resolve('');
  }

  async create(createCanalDto: CreateCanalDto) {
    try {
      await this.checkIfCanalExist(createCanalDto.name);
      const canal = await this.prisma.canals.create({
        data: createCanalDto,
      });
      return {
        data: canal,
        message: 'Canal successfully created',
      };
    } catch (e) {
      return new HttpException(e, 400);
    }
  }

  async findAll() {
    try {
      const canals = await this.prisma.canals.findMany();
      return {
        data: canals,
      };
    } catch (e) {
      return new HttpException(e, 400);
    }
  }

  async update(id: number, updateCanalDto: UpdateCanalDto) {
    try {
      await this.checkIfCanalExist(updateCanalDto.name, id);
      const canal = await this.prisma.canals.update({
        where: {
          id,
        },
        data: updateCanalDto,
      });
      return {
        data: canal,
        message: 'Canal successfully updated',
      };
    } catch (e) {
      return new HttpException(e, 400);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.canals.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Canal successfully deleted',
      };
    } catch (e) {
      return new HttpException(e, 400);
    }
  }
}
