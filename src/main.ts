import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  console.log('создать файл constans с константами провайдеров');
  console.log('прописать в openapi, че возвращают');
  const config = new DocumentBuilder()
    .setTitle('My FOREST')
    .setDescription('The TEST API description')
    .setVersion('1.0')
    .addTag('my forest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.NODE_ENV==="production"? process.env.PORT : 3000);
}
bootstrap();
