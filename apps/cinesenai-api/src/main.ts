import { NestFactory } from '@nestjs/core';
import { FilmeModule } from './filme/filme.module';

async function bootstrap() {
  const app = await NestFactory.create(FilmeModule);

  app.setGlobalPrefix('api');

  app.enableCors({ origin: 'http://localhost:5173' });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
