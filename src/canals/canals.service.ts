import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IWhereCanal } from 'src/canals/canals.interface';
import { CreateCanalDto } from './dto/create-canal.dto';
import { UpdateCanalDto } from './dto/update-canal.dto';
import { SuggestCanalDto } from './dto/suggest-canal.dto';
import { shipTypes } from './canals.constants';
import { CanalDirections, CanalTypes } from '@prisma/client';
import {
  transformCanalData,
  transformCanalRoutes,
  transformSuggestedCanalComputation,
} from './canals.transform';
import { shipRate, shipSpeed } from 'src/ships/ships.constants';

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

  formatRoutes = (direction: any) => {
    if (direction === 'northbound_southbound')
      return [
        {
          direction: 'northbound',
          is_close: false,
        },
        {
          direction: 'southbound',
          is_close: false,
        },
      ];

    return [
      {
        direction,
        is_close: false,
      },
    ];
  };

  async create(createCanalDto: CreateCanalDto) {
    try {
      await this.checkIfCanalExist(createCanalDto.name);
      const { direction, ...canalData } = createCanalDto;
      const canal = await this.prisma.canals.create({
        data: {
          ...canalData,
          ways: direction !== 'northbound_southbound' ? 'one_way' : 'two_way',
          canal_routes: {
            createMany: {
              data: this.formatRoutes(direction),
            },
          },
        },
        include: {
          canal_routes: {},
        },
      });
      return {
        data: canal,
        message: 'Canal successfully created',
      };
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
  //
  async findAll() {
    try {
      const canals = await this.prisma.canal_routes.findMany({
        include: {
          canals: {
            include: {
              canal_size: {},
            },
          },
        },
      });
      return {
        data: transformCanalRoutes(canals),
      };
    } catch (e) {
      throw new HttpException(e, 400);
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
      throw new HttpException(e, 400);
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
      throw new HttpException(e, 400);
    }
  }

  async getAvailableCanal(suggestCanalDto: SuggestCanalDto) {
    try {
      const shipTypeIndex = shipTypes.indexOf(suggestCanalDto.type);
      const canalAvailable = await this.prisma.canal_routes.findFirstOrThrow({
        orderBy: [
          {
            canals: {
              size_id: 'asc',
            },
          },
          {
            canals: {
              length: 'asc',
            },
          },
        ],
        where: {
          is_close: false,
          direction: suggestCanalDto.direction,
          ships: {
            every: {
              time_out: {
                lte: new Date(),
              },
            },
          },
          canals: {
            size_id: {
              gt: shipTypeIndex,
            },
          },
        },
        include: {
          canals: {
            include: {
              canal_size: {},
            },
          },
        },
      });
      const canal = transformCanalData(canalAvailable);

      return {
        canal,
        rate: transformSuggestedCanalComputation(
          canal.length,
          suggestCanalDto.type,
        ),
      };
    } catch (error) {
      throw new HttpException('No Available Canal', 400);
    }
  }
}
