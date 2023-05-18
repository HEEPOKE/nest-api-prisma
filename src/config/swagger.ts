import { DocumentBuilder } from '@nestjs/swagger';
import config from './config';
import { Host } from '../enums/host.enum';

const configSwagger = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('Hee')
  .addServer(config.LOCAL_HOST, Host.LOCAL_SERVER)
  .addServer(config.PRODUCTION_HOST, Host.PRODUCTION_SERVER)
  .build();

const swaggerConfig = {
  configSwagger,
};

export default swaggerConfig;
