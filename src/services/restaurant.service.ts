import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Express } from 'express'; 

@Injectable()
export class RestaurantService {
  private supabaseUrl = 'https://tieoeofysjjwiguvbosg.supabase.co';
  private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZW9lb2Z5c2pqd2lndXZib3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2ODM1MjUsImV4cCI6MjA0MzI1OTUyNX0.nsj0S3DNK7yj61IPT_IhsiYZ4vq_r9YVloXDeR-OItM';
  private supabase = createClient(this.supabaseUrl, this.supabaseAnonKey);

  async uploadPhoto(file: Express.Multer.File) {
    try {
      console.log('Uploading file:', file.originalname); // Log the file name
  
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
  
}
