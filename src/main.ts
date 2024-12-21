import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('pug');
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();