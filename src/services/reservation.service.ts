import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

@Injectable()
export class ReservationService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  async createReservation(tableId: number, userId: number, beginningTime: string, endingTime: string, capacityRequested: number) {
    if (new Date(beginningTime) >= new Date(endingTime)) {
      throw new Error('Beginning time must be less than ending time.');
    }

    const { data: user, error: userError } = await this.supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      throw new Error('Invalid user.');
    }

    const today = new Date().toISOString().split('T')[0];
    const { data: holiday, error: holidayError } = await this.supabase
      .from('holiday schedule')
      .select('*')
      .eq('date', today)
      .single();

    let schedule;
    if (holiday) {
      schedule = holiday; 
    } else {
      const dayOfWeek = new Date().getDay(); 
      const { data: daySchedule, error: dayScheduleError } = await this.supabase
        .from('day schedule')
        .select('*')
        .eq('id', dayOfWeek)
        .single();

      if (dayScheduleError || !daySchedule) {
        throw new Error('No schedule available for today.');
      }
      schedule = daySchedule;
    }

    const openingTime = new Date(`${today}T${schedule.openingAt}`);
    const closingTime = new Date(`${today}T${schedule.closingAt}`);

    if (new Date(beginningTime) < openingTime || new Date(endingTime) > closingTime) {
      throw new Error('Reservation time is outside of working hours.');
    }

    const { data: conflictingReservation, error: reservationError } = await this.supabase
      .from('reservation')
      .select('*')
      .eq('table_id', tableId)
      .or(`beginning_at.lte.${endingTime},ending_at.gte.${beginningTime}`)
      .single();

    if (conflictingReservation) {
      await this.supabase
        .from('reservation')
        .delete()
        .eq('id', conflictingReservation.reservation_ID);
    }

    const { data: table, error: tableError } = await this.supabase
      .from('table')
      .select('*')
      .eq('id', tableId)
      .single();

    if (tableError || !table) {
      throw new Error('Table not found.');
    }

    if (table.capacity < capacityRequested) {
      throw new Error('Requested capacity exceeds the table capacity.');
    }

    const { data: newReservation, error: insertError } = await this.supabase
      .from('reservation')
      .insert({
        table_id: tableId,
        user_id: userId,
        beginning_at: beginningTime,
        ending_at: endingTime,
        confirmation_status: 0,
      });

    if (insertError) {
      throw new Error('Failed to create reservation.');
    }

    return { message: 'Reservation created successfully', reservation: newReservation };
  }

  async getReservations() {
    const { data: reservations, error } = await this.supabase
      .from('reservation')
      .select('*');

    if (error) {
      throw new Error('Failed to fetch reservations.');
    }

    return reservations;
  }

  async cancelReservation(tableId: number, beginningTime: string, endingTime: string) {
    const { data: reservation, error } = await this.supabase
      .from('reservation')
      .select('*')
      .eq('table_id', tableId)
      .or(`beginning_at.lte.${endingTime},ending_at.gte.${beginningTime}`)
      .single();

    if (!reservation) {
      throw new Error('No reservation found for the given table and time.');
    }

    const { error: deleteError } = await this.supabase
      .from('reservation')
      .delete()
      .eq('id', reservation.id);

    if (deleteError) {
      throw new Error('Failed to cancel reservation.');
    }

    return { message: 'Reservation canceled successfully.' };
  }
}
