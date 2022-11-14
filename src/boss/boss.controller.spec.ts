import { Test, TestingModule } from '@nestjs/testing';
import { BossController } from './boss.controller';

describe('BossController', () => {
  let controller: BossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BossController],
    }).compile();

    controller = module.get<BossController>(BossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
