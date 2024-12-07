import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('reserve')
  async createReservation(@Body() body) {
    const { tableId, userId, beginningTime, endingTime, capacityRequested } = body;
    try {
      const reservation = await this.reservationService.createReservation(tableId, userId, beginningTime, endingTime, capacityRequested);
      return reservation;
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get('reservations')
  async getReservations() {
    try {
      const reservations = await this.reservationService.getReservations();
      return reservations;
    } catch (error) {
      return { message: 'Error retrieving reservations', error: error.message };
    }
  }

  @Post('cancel')
  async cancelReservation(@Body() body) {
    const { tableId, beginningTime, endingTime } = body;
    try {
      const result = await this.reservationService.cancelReservation(tableId, beginningTime, endingTime);
      return result;
    } catch (error) {
      return { message: error.message };
    }
  }
}
