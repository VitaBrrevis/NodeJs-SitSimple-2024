import { SupabaseClient } from '@supabase/supabase-js';

interface ReservationData {
  tableId: string;
  beginningTime: string;
  endingTime: string;
}

interface SearchCriteria {
  city?: string;
  date?: string;
}

export class BookingService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getAllRestaurants() {
    const { data: restaurants, error } = await this.supabase.from('restaurant').select('*');
    if (error) {
      throw new Error('Error fetching restaurants.');
    }
    return restaurants;
  }

  async getRestaurantById(restaurantId: string) {
    const { data: restaurant, error } = await this.supabase.from('restaurant').select('*').eq('id', restaurantId).single();
    if (error || !restaurant) {
      throw new Error('Restaurant not found.');
    }
    return restaurant;
  }

  async searchRestaurants(criteria: SearchCriteria) {
    let query = this.supabase.from('restaurant').select('*');

    if (criteria.city && criteria.city !== '-1') {
      query = query.eq('address_id', criteria.city);
    }

    if (criteria.date) {
      query = query.not(
        'id',
        'in',
        this.supabase.from('holiday_schedule').select('restaurant_id').eq('date', criteria.date)
      );
    }

    const { data: restaurants, error } = await query;

    if (error) {
      throw new Error('Error searching for restaurants.');
    }

    return restaurants;
  }

  async createReservation(data: ReservationData, userId: string) {
    const { tableId, beginningTime, endingTime } = data;

    const beginningTimestamp = new Date(beginningTime).toISOString();
    const endingTimestamp = new Date(endingTime).toISOString();

    const { data: overlappingReservations, error: overlapError } = await this.supabase
      .from('reservation')
      .select('id')
      .eq('table_id', tableId)
      .or(`and(beginning_at.lte.${endingTimestamp},ending_at.gte.${beginningTimestamp})`);

    if (overlapError) {
      throw new Error('Error checking for overlapping reservations.');
    }

    if (overlappingReservations.length > 0) {
      throw new Error('The table is occupied at the selected time.');
    }

    const { data: reservation, error: reservationError } = await this.supabase
      .from('reservation')
      .insert({
        user_id: userId,
        table_id: tableId,
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
