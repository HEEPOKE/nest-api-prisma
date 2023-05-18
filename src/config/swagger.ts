import { DocumentBuilder } from '@nestjs/swagger';

const configSwagger = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('Hee')
  .build();

const swaggerConfig = {
  configSwagger,
};

export default swaggerConfig;
