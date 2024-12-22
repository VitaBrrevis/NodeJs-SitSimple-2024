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
import {LogoutController} from './controllers/logout.controller'
import {LogoutModule} from './modules/logout.module'
import { RegisterController } from './controllers/register.controller';
import { RegisterModule } from './modules/register.module'; 
import { RegisterService } from './services/register.service';  

@Module({

  imports: [ReservationModule, RestaurantModule, BookingModule, LoginModule, LogoutModule, RegisterModule],
  controllers: [AppController, RestaurantController, BookingController, LoginController, LogoutController, RegisterController],
  providers: [AppService, RestaurantService, LoginService, RegisterService],
  exports: [AppService],
})
export class AppModule {}
