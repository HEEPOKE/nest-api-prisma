import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';
import { Host } from '../enums/host.enum';

function buildSwagger() {
  const configSwagger = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Hee')
    .addServer(config.LOCAL_HOST, Host.LOCAL_SERVER)
    .addServer(config.PRODUCTION_HOST, Host.PRODUCTION_SERVER)
    .build();

  return configSwagger;
}

function createDocument(app: any, documentConfig: any) {
  const document = SwaggerModule.createDocument(app, documentConfig);
  document.security = [];

  return document;
}

const options = {
  customCss: '.swagger-ui .topbar .search-container { display: flex; }',
  customSiteTitle: 'Search API',
};

const swaggerConfig = {
  build: buildSwagger,
  create: createDocument,
  option: options,
};

export default swaggerConfig;
