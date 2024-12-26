import { Controller, Get, Post, Param, Render, Query, Body, Req , Res} from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { AppService } from '../app.service';
import { Request } from 'express';

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

  async showRestaurantBookingPage(@Param('restaurant_id') restaurantId: string,
                                  @Req() req: Request,
                                  @Res() res) {
    try {
      const userId = req.cookies.user ? JSON.parse(req.cookies.user).id : null;
      if (!userId) {
        res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
        return;
      }
      const restaurant = await this.bookingService.getRestaurantById(restaurantId);
      const rooms = await this.bookingService.getRoomsByRestaurantId(restaurantId);
      /**
       *   const tables = await this.bookingService.getTablesByRoomIds(rooms.map(room => room.id));
        */

      return res.render('booktable-restaurant',{
        restaurant,
        rooms,
        headerContent: this.appService.getHeaderContent(),
        footerContent: this.appService.getFooterContent(),
      });

    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('tables/:room_id')
  async getTablesByRoomId(@Param('room_id') roomId: string) {
    try {
      const tables = await this.bookingService.getTablesByRoomId(roomId);
      return tables;
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
  @Post('reserve/:table_id')
  async createReservation(
    @Param('table_id') tableId: string,
    @Body() body: { beginningTime: string, endingTime: string },
    @Req() req: Request,
    @Res() res) {
    try {
      const userId = req.cookies.user ? JSON.parse(req.cookies.user).id : null;
      if (!userId) {
        res.redirect(`/login?redirect=${encodeURIComponent(req.originalUrl)}`);
        return;
      }
      const reservation = await this.bookingService.createReservation(tableId, body.beginningTime, body.endingTime);
      res.status(200).send({}).end()
    } catch (error) {
      res.status(400).send({error: error.message}).end();
    }
  }
}
