import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service'; 
import { ReservationModule } from './modules/reservation.module';
import { RestaurantModule } from './modules/restaurant.module';
import { BookingModule } from './modules/booking.module';
import { BookingController } from './controllers/booking.controller';


@Module({

  imports: [ReservationModule, RestaurantModule, BookingModule],
  controllers: [AppController, RestaurantController, BookingController],
  providers: [AppService, RestaurantService],
  exports: [AppService],
})
export class AppModule {}
