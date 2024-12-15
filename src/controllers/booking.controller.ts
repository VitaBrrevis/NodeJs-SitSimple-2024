import { Controller, Get, Post, Param, Render, Query, Body } from '@nestjs/common';
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
      const cities = await this.bookingService.getAllCities(); // Fetch cities

      return {
        restaurants,
        cities,
        headerContent: this.appService.getHeaderContent(),
        footerContent: this.appService.getFooterContent()};
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('show/:restaurant_id')
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

  @Get('search')
  @Render('booktable')
  async searchRestaurants(@Query('city') city: string, @Query('date') date: string) {
    try {
      const restaurants = await this.bookingService.searchRestaurants(city, date);
      const cities = await this.bookingService.getAllCities();
      return {
        restaurants,
        cities,
        headerContent: this.appService.getHeaderContent(),
        footerContent: this.appService.getFooterContent(),
      };
    } catch (error) {
      return { error: error.message };
    }
  }
  @Post('reserve/:restaurant_id')
  async createReservation(
    @Param('restaurant_id') restaurantId: string,
    @Body() body: { beginningTime: string, endingTime: string }) {
    try {
      const reservation = await this.bookingService.createReservation(restaurantId, body.beginningTime, body.endingTime);
      return { reservation };
    } catch (error) {
      return { error: error.message };
    }
  }
}
