import { Module } from '@nestjs/common';
import { RestaurantController } from '../controllers/restaurant.controller';
import { RestaurantService } from '../services/restaurant.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}