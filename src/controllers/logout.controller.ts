import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logout')
export class LogoutController {
    @Get()
    logout(@Res() res: Response) {
    
        res.clearCookie('user');

        
        if (res.req.xhr) {
            return res.json({ success: true });
        }

        
        return res.redirect('/login');
    }
}
