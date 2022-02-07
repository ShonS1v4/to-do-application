import { NestFactory } from '@nestjs/core';
import { appModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(appModule, {
    logger: ['error'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('REST API for ToDo application')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    .build();

  const swagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/doc', app, swagger);

  await app.listen(port, async () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

start();
