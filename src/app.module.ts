import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './modules/restaurant.module'; 
import { ReservationModule } from './modules/reservation.module';  


@Module({
  imports: [ReservationModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
