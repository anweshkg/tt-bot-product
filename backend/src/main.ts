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
      // 'http://localhost:8000',
      // 'http://localhost:7000',
    ],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers you need
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // One day
  });
  await app.listen(2500);
}
bootstrap();
