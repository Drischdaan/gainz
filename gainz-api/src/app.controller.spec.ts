import { TestBed } from '@suites/unit';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(AppController).compile();

    appController = unit;
  });

  describe('/ping', () => {
    it('should return "pong"', () => {
      expect(appController.getPing()).toEqual({ ping: 'pong' });
    });
  });
});
