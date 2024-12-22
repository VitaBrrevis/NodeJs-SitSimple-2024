import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

@Injectable()
export class RegisterService {
    private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    async registerUser(name: string, email: string, password: string) {
       
        const { data: existingUser, error: findError } = await this.supabase
            .from('user')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return { success: false, error: 'User with this email already exists.' };
        }

        
        const { error: insertError } = await this.supabase
            .from('user')
            .insert([{ name, email, password }]);

        if (insertError) {
            return { success: false, error: 'Failed to register user. Please try again.' };
        }

        return { success: true };
    }
}
