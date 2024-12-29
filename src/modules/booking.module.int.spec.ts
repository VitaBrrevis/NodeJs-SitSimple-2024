import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { BookingModule } from './booking.module';
import { BookingService } from '../services/booking.service';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

describe('BookingModule (integration)', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {

    const tmodule: TestingModule = await Test.createTestingModule({
      imports: [BookingModule]
    }).compile();

    app = tmodule.createNestApplication<NestExpressApplication>();
    app.setViewEngine('pug');
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    await app.init();
  });

  it('/GET booktable', () => {
    return request(app.getHttpServer())
      .get('/booktable')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

