import { Test, TestingModule } from '@nestjs/testing';
import { WalkerController } from './walker.controller';

describe('WalkerController', () => {
  let controller: WalkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalkerController],
    }).compile();

    controller = module.get<WalkerController>(WalkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
