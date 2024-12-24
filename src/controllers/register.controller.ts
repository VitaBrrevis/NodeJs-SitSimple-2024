import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterService } from '../services/register.service';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Get()
    @Render('register') 
    showRegisterPage() {
        return {};
    }

    @Post()
    async handleRegister(
        @Body() body: { name: string; email: string; password: string },
        @Res() res: Response
    ) {
        const result = await this.registerService.registerUser(body.name, body.email, body.password);

        if (result.success) {
            res.redirect('/login'); // Переходимо на сторінку логіну після успішної реєстрації
        } else {
            return res.render('register', { error: result.error });
        }
    }
}
