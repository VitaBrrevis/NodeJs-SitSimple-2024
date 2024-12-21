import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service'; 
import { ReservationModule } from './modules/reservation.module';
import { RestaurantModule } from './modules/restaurant.module';
import { BookingModule } from './modules/booking.module';
import { LoginController } from './controllers/login.controller';
import { BookingController } from './controllers/booking.controller';
import { LoginModule } from './modules/login.module';
import{LoginService} from './services/login.service'
@Module({

  imports: [ReservationModule, RestaurantModule, BookingModule, LoginModule],
  controllers: [AppController, RestaurantController, BookingController, LoginController],
  providers: [AppService, RestaurantService, LoginService],
  exports: [AppService],
})
export class AppModule {}
