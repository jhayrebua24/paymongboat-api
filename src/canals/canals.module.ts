import { Module } from '@nestjs/common';
import { CanalsService } from './canals.service';
import { CanalsController } from './canals.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CanalsController],
  providers: [CanalsService, PrismaService],
})
export class CanalsModule {}
