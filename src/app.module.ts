import { Module } from '@nestjs/common';
import { CanalsModule } from './canals/canals.module';

@Module({
  imports: [CanalsModule],
})
export class AppModule {}
