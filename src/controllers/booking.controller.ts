import { Controller, Get, Param, Render } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { AppService } from '../app.service';

@Controller('booktable')
export class BookingController {
  constructor(private readonly bookingService: BookingService,
              private readonly appService: AppService)  {}

  @Get()
  @Render('booktable')
  async showBookingPage() {
    try {
      const restaurants = await this.bookingService.getAllRestaurants();
      return { restaurants,
        headerContent: this.appService.getHeaderContent(),
        footerContent: this.appService.getFooterContent()};
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':restaurant_id')
  @Render('booktable-restaurant')
  async showRestaurantBookingPage(@Param('restaurant_id') restaurantId: string) {
    try {
      const restaurant = await this.bookingService.getRestaurantById(restaurantId);
      return { restaurant,
        headerContent: this.appService.getHeaderContent(),
        footerContent: this.appService.getFooterContent(),
    };
    } catch (error) {
      return { error: error.message };
    }
  }
}
