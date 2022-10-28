import { Test, TestingModule } from '@nestjs/testing';
import { CanalsController } from './canals.controller';
import { CanalsService } from './canals.service';

describe('CanalsController', () => {
  let controller: CanalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CanalsController],
      providers: [CanalsService],
    }).compile();

    controller = module.get<CanalsController>(CanalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
