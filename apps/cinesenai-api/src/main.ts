import { NestFactory } from '@nestjs/core';
import { FilmeModule } from './filme/filme.module';

async function bootstrap() {
  const app = await NestFactory.create(FilmeModule);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
