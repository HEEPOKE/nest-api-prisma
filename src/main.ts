import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import config from './config/config';
import swaggerConfig from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.enableCors();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig.configSwagger,
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
}

bootstrap();
