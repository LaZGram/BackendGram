import { Test, TestingModule } from '@nestjs/testing';
import { DebitcardService } from './debitcard.service';

describe('DebitcardService', () => {
  let service: DebitcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebitcardService],
    }).compile();

    service = module.get<DebitcardService>(DebitcardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
