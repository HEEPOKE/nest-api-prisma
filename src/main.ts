import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
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
  document.security = [];
  SwaggerModule.setup('api', app, document);
  const options = {
    customCss: '.swagger-ui .topbar .search-container { display: flex; }',
    customSiteTitle: 'Search API',
  };
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document, options));
  await app.listen(config.PORT);
}

bootstrap();
