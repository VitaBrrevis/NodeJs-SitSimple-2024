import { Module } from '@nestjs/common';
import { RestaurantController } from '../controllers/restaurant.controller';

@Module({
  controllers: [RestaurantController],

})
export class RestaurantModule {}
