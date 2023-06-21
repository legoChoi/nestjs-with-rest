import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터 붙지 않은 속성은 거름(에러x: 데코레이터 없는거 뺴고 전달)
      forbidNonWhitelisted: true, // request 자체에 도달 못하게
      transform: true, // 타입 변환 기능
    }),
  );
  await app.listen(3002);
}
bootstrap();
