import { Controller, Get, Post, Render, Body, Query, Res } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    @Render('login')
    showLoginPage(@Query('redirect') redirect: string) {
        return { redirect }; // Передаємо redirect в шаблон
    }

    @Post()
    async handleLogin(
        @Body() body: { email: string; password: string },
        @Query('redirect') redirect: string,
        @Res() res: Response
    ) {
        const user = await this.loginService.validateUser(body.email, body.password);

        if (user) {
            res.cookie('user', JSON.stringify({ id: user.id, name: user.name }), {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1 день
            });

            // Повертаємо користувача на сторінку, яку він хотів відвідати
            if (redirect) {
                return res.redirect(redirect);
            }

            return res.redirect('/');
        } else {
            return res.render('login', { error: 'Invalid email or password', redirect });
        }
    }
}
