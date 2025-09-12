import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController (health)', () => {
  let controller: AppController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('health returns ok', () => {
    expect(controller.health()).toEqual({ status: 'ok' });
  });
});
