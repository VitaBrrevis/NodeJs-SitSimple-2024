import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

@Injectable()
export class BookingService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  async getAllRestaurants() {
    const { data: restaurants, error } = await this.supabase
      .from('restaurant')
      .select('*');

    if (error) {
      throw new Error('Error fetching restaurants.');
    }

    return restaurants;
  }

  async getRestaurantById(restaurantId: string) {
    const { data: restaurant, error } = await this.supabase
      .from('restaurant')
      .select('*')
      .eq('id', restaurantId)
      .single();

    if (error || !restaurant) {
      throw new Error('Restaurant not found.');
    }

    return restaurant;
  }
  async getAllCities() {
    const { data: cities, error } = await this.supabase
      .from('address')
      .select('id, city');

    if (error) {
      throw new Error('Error fetching cities.');
    }

    cities.unshift({ id: -1, city: 'All cities' });
    return cities;
  }
  async searchRestaurants(city: string, date: string) {
    let query = this.supabase.from('restaurant').select('*');

    if (city && city !== '-1' ) {
      query = query.eq('address_id', city);
    }

    if (date) {
      query = query.not('id', 'in', this.supabase
        .from('holiday_schedule')
        .select('restaurant_id')
        .eq('date', date)
      );
    }

    const { data: restaurants, error } = await query;

    if (error) {
      throw new Error('Error searching for restaurants.');
    }

    return restaurants;
  }

  async createReservation(restaurantId: string, beginningTime: string, endingTime: string) {
    // Find the table_id associated with the restaurant
    const { data: room, error: roomError } = await this.supabase
      .from('room')
      .select('id')
      .eq('restaurant_id', restaurantId)
      .limit(1)
      .single();

    if (roomError || !room) {
      throw new Error('Room not found for the given restaurant.');
    }
    const { data: table, error: tableError } = await this.supabase
      .from('table')
      .select('id')
      .eq('room_id', room.id)
      .limit(1)
      .single();

    if (tableError || !room) {
      throw new Error('Room not found for the given restaurant.');
    }
    
    // Convert beginningTime and endingTime to timestamp format
    const beginningTimestamp = new Date(beginningTime).toISOString();
    const endingTimestamp = new Date(endingTime).toISOString();

    const { data: reservation, error: reservationError } = await this.supabase
      .from('reservation')
      .insert({
        user_id: 1, // Always use user_id 1
        table_id: table.id,
        beginning_at: beginningTimestamp,
        ending_at: endingTimestamp,
      })
      .single();

    if (reservationError) {
      throw new Error('Error creating reservation.');
    }

    return reservation;
  }
}