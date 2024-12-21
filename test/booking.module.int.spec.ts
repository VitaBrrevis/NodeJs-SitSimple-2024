import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookingModule } from './booking.module';
import { BookingService } from '../services/booking.service';

describe('BookingModule (integration)', () => {
  let app: INestApplication;
  let bookingService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookingModule],
    })
      .overrideProvider(BookingService)
      .useValue(bookingService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET bookings', () => {
    return request(app.getHttpServer())
      .get('/bookings')
      .expect(200)
      .expect(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});