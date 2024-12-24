import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

 
  app.setViewEngine('pug');
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors();


  app.use(cookieParser());

  app.use((req, res, next) => {
    const userCookie = req.cookies.user; 
    res.locals.user = userCookie ? JSON.parse(userCookie) : null; 
    next(); 
  });

  await app.listen(3000);
}
bootstrap();
