import { Module } from '@nestjs/common';
import { CanalsModule } from './canals/canals.module';
import { ShipsModule } from './ships/ships.module';

@Module({
  imports: [CanalsModule, ShipsModule],
})
export class AppModule {}
