import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    @Render('login') // Рендеримо шаблон login.pug
    showLoginPage() {
        return {};
    }

    @Post()
    async handleLogin(
        @Body() body: { email: string; password: string },
        @Res() res: Response,
    ) {
        const user = await this.loginService.validateUser(body.email, body.password);

        if (user) {
            // Якщо користувач знайдений, встановлюємо сесію
            res.cookie('user', JSON.stringify({ id: user.id, name: user.name }), {
                httpOnly: true,
            });
            return res.redirect('/'); // Перенаправляємо на головну
        } else {
            // Якщо дані некоректні, показуємо помилку
            return res.render('login', { error: 'Invalid email or password' });
        }
    }
}
