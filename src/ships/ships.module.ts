import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { PrismaService } from 'src/prisma.service';
import { CanalsService } from 'src/canals/canals.service';

@Module({
  controllers: [ShipsController],
  providers: [ShipsService, PrismaService, CanalsService],
})
export class ShipsModule {}
