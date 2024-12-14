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

  async createBooking(restaurantId: string, userId: number, tableId: number, beginningTime: string, endingTime: string) {
    // Implement booking logic here
  }
}