import { HttpException, Injectable } from '@nestjs/common';
import { CanalsService } from 'src/canals/canals.service';
import { transformSuggestedCanalComputation } from 'src/canals/canals.transform';
import { PrismaService } from 'src/prisma.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { transformShipData, transformShips } from './ships.transform';

@Injectable()
export class ShipsService {
  constructor(
    private prisma: PrismaService,
    private readonly canalService: CanalsService,
  ) {}

  private canalIncludes = {
    canal_routes: {
      include: {
        canals: {
          include: {
            canal_size: {},
          },
        },
      },
    },
  };

  async checkIfShipExist(name: string) {
    const count = await this.prisma.ships.count({
      where: {
        name,
      },
    });

    if (count > 0) return Promise.reject('Ship already exists');
    return Promise.resolve('');
  }

  async create({ direction, type, canal_route_id, name }: CreateShipDto) {
    try {
      await this.checkIfShipExist(name);
      const canal = await this.canalService.getShortestCanal({
        direction,
        type,
      });
      if (canal_route_id !== canal.id) {
        throw new HttpException('Suggested Canal is not valid', 400);
      }
      const rate = transformSuggestedCanalComputation(
        canal.length,
        type,
        false,
      );
      const ship = await this.prisma.ships.create({
        data: {
          name,
          canal_route_id: canal.id,
          type,
          ...rate,
        },
        include: this.canalIncludes,
      });

      return {
        data: transformShipData(ship),
        message: 'Ship created',
      };
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async findAll() {
    try {
      const ships = await this.prisma.ships.findMany({
        include: this.canalIncludes,
      });

      return {
        data: transformShips(ships),
      };
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}
