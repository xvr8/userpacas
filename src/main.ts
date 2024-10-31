import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solo el frontend que corre en localhost:4200
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Habilita el envío de cookies y credenciales si es necesario
  });

  await app.listen(3000);
}
bootstrap();
