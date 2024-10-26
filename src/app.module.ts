import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service'; 
// import { SupabaseService } from './services/supabase.service';  




@Module({
  controllers: [AppController, RestaurantController],
  providers: [AppService, RestaurantService],
})
export class AppModule {}
