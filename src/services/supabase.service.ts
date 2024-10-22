// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { createClient } from '@supabase/supabase-js';

// @Injectable()
// export class SupabaseService implements OnModuleInit {
//   private supabaseUrl = 'https://tieoeofysjjwiguvbosg.supabase.co';
//   private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZW9lb2Z5c2pqd2lndXZib3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2ODM1MjUsImV4cCI6MjA0MzI1OTUyNX0.nsj0S3DNK7yj61IPT_IhsiYZ4vq_r9YVloXDeR-OItM';
//   private supabase;

//   constructor() {
//     this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey);
//   }

//   async onModuleInit() {
//     console.log('Application has started. Inserting default data...');

//     const { error: dbError } = await this.supabase
//       .from('restaurant')
//       .insert({
//         name: 'Defamjhghjkult Restaurant',
//         email_address: 'default@example.com',
//         contact_number: '123456789',
//         social_media: 'default_social',
//         website: 'http://default-website.com',
//         photo_restaurant: 'default_photo_path', 
//       });

//     if (dbError) {
//       console.error('Error inserting default data:', dbError);
//     } else {
//       console.log('Default data inserted successfully.');
//     }
//   }
// }
