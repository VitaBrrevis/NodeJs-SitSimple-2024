import { Module } from '@nestjs/common';
import { LoginController } from '../controllers/login.controller';
import { LoginService } from '../services/login.service';

@Module({
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
