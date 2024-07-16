import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  await app.listen(envs.port);

  app.enableCors({
    origin: [
      'http://localhost:5173/', 
      'https://client-devfinders.vercel.app/'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    // preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalGuards();

  logger.log(`Applicaction listening on port ${envs.port}`);
}

bootstrap();
