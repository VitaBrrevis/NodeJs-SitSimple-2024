import { Module } from '@nestjs/common';
import { RegisterController } from '../controllers/register.controller';    
import { RegisterService } from '../services/register.service'; 

@Module({
    controllers: [RegisterController],
    providers: [RegisterService],
})
export class RegisterModule {}
