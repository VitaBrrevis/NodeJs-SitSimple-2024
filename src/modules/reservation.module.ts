import { Module } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { ReservationController } from '../controllers/reservation.controller';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
