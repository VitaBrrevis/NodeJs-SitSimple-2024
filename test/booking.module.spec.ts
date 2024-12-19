import { Test, TestingModule } from '@nestjs/testing';
import { BookingModule } from './booking.module';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { AppService } from '../app.service';

describe('BookingModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [BookingModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have BookingController', () => {
    const bookingController = module.get<BookingController>(BookingController);
    expect(bookingController).toBeInstanceOf(BookingController);
  });

  it('should have BookingService', () => {
    const bookingService = module.get<BookingService>(BookingService);
    expect(bookingService).toBeInstanceOf(BookingService);
  });

  it('should have AppService', () => {
    const appService = module.get<AppService>(AppService);
    expect(appService).toBeInstanceOf(AppService);
  });
});