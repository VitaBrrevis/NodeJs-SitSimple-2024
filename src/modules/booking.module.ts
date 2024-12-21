import { Module } from '@nestjs/common';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { AppService } from '../app.service';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, AppService],
  exports: [BookingService],
})
export class BookingModule {}