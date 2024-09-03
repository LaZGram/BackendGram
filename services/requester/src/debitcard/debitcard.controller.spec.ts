import { Test, TestingModule } from '@nestjs/testing';
import { DebitcardController } from './debitcard.controller';
import { DebitcardService } from './debitcard.service';

describe('DebitcardController', () => {
  let controller: DebitcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebitcardController],
      providers: [DebitcardService],
    }).compile();

    controller = module.get<DebitcardController>(DebitcardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
