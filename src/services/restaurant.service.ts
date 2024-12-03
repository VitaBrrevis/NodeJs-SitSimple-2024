import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class RestaurantService {
  private supabaseUrl = process.env.SUPABASE_URL as string;
  private supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;
  private supabase = createClient(this.supabaseUrl, this.supabaseAnonKey);


  async uploadPhoto(file: Express.Multer.File) {
    try {
      console.log('Uploading file:', file.originalname);
  
      const { data, error } = await this.supabase
        .storage
        .from('restaurant_photos')
        .upload(`public/${file.originalname}`, file.buffer);
  
      if (error) {
        console.error('Photo upload error:', error);
        throw new Error('Failed to upload photo');
      }
  
      console.log('File uploaded successfully. Path:', data.path); // Log the uploaded file path
      return data.path; // Return the photo path for the database
    } catch (err) {
      console.error('Error in uploadPhoto:', err);
      throw err;
    }
  }
  

  async insertRestaurantData(establishmentName: string, email: string, phone: string, socialMedia: string, website: string, photoPath: string | null) {
    try {
      const dataToInsert: any = {
        name: establishmentName,
        email_address: email,
        contact_number: phone,
        social_media: socialMedia,
        website: website,
      };
  
      // Add photo path only if it exists
      if (photoPath) {
        dataToInsert.photo_restaurant = photoPath;
      }
  
      const { error } = await this.supabase
        .from('restaurant')
        .insert(dataToInsert);
  
      if (error) {
        console.error('Database insertion error:', error);
        throw new Error('Failed to register restaurant');
      }
      return { success: true };
    } catch (err) {
      console.error('Error in insertRestaurantData:', err);
      throw err;
    }
  }

  async getAllRestaurants() {
    const { data, error } = await this.supabase.from('restaurant').select('*');
    if (error) throw new Error('Failed to fetch restaurants');
    return data;
  }
  
  async getRestaurantById(id: string) {
    const { data, error } = await this.supabase.from('restaurant').select('*').eq('id', id).single();
    if (error) throw new Error('Failed to fetch restaurant by id');
    if (!data) throw new Error('Restaurant not found');
    return data;
  }

  async updateRestaurant(id: string, updateData: any) {
    const { error } = await this.supabase.from('restaurant').update(updateData).eq('id', id);
    if (error) throw new Error('Failed to update restaurant');
    return { success: true };
  }

  async deleteRestaurant(id: string) {
    const { error } = await this.supabase.from('restaurant').delete().eq('id', id);
    if (error) throw new Error('Failed to delete restaurant');
    return { success: true }; 
  }
}
