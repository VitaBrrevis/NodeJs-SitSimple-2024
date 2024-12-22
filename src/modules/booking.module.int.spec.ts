import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { BookingModule } from './booking.module';
import { BookingService } from '../services/booking.service';
import { join } from 'path';

describe('BookingModule (integration)', () => {
  let app: NestExpressApplication;
  let bookingService = { getAllRestaurants: () =>
  [
    {
      "id": 1,
      "name": "Default Restaurant",
      "contact_number": "123456789",
      "email_address": "default@example.com",
      "address_id": 2,
      "social_media": "default_social",
      "website": "http://default-website.com",
      "photo_restaurant": "defaultrestaurant.jpg"
    }
  ],
  getAllCities: () => [
      {
        "id": -1,
        "city": "All cities"
      },
      {
        "id": 2,
        "city": "Gotham"
      }
      ]
    };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookingModule]
    })
      .overrideProvider(BookingService)
      .useValue(bookingService)
      .compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
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

