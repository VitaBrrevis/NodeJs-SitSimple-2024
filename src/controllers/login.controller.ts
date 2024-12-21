import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    @Render('login') 
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
            res.cookie('user', JSON.stringify({ id: user.id, name: user.name }), {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, 
            });
            return res.redirect('/'); // 
        } else {
            return res.render('login', { error: 'Invalid email or password' });
        }
    }
}
