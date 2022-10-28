import { Test, TestingModule } from '@nestjs/testing';
import { CanalsService } from './canals.service';

describe('CanalsService', () => {
  let service: CanalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanalsService],
    }).compile();

    service = module.get<CanalsService>(CanalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
