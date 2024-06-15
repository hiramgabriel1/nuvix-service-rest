import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger() 
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
  logger.log(`Applicaction listening on port ${envs.port}`)

}

bootstrap();
