import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AtGaurd())
  app.enableCors({
    origin: [
      'http://localhost:2000',
      'https://www.fotfun.com/',
      process.env.FRONTEND_URL_DOMAIN,
      process.env.FRONTEND_URL_CLOUD,
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers you need
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // One day
  });
  await app.listen(process.env.PORT);
}
bootstrap();
