import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

@Injectable()
export class LoginService {
    private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    async validateUser(email: string, password: string) {
        const { data: user, error } = await this.supabase
            .from('user')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return null; // Користувач не знайдений
        }

        // Просте порівняння пароля. Для хешованих паролів використовуйте bcrypt.
        if (user.password === password) {
            return user;
        }

        return null; // Невірний пароль
    }
}
