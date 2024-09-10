import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';


function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('KU-MAN')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth() // Add the Bearer Auth scheme
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Apply Bearer Auth globally
  document.paths = Object.keys(document.paths).reduce((acc, path) => {
    acc[path] = Object.keys(document.paths[path]).reduce((innerAcc, method) => {
      innerAcc[method] = {
        ...document.paths[path][method],
        security: [...(document.paths[path][method].security || []), { bearer: [] }],
      };
      return innerAcc;
    }, {});
    return acc;
  }, {});
  

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
console.log('SERVICE_NAME:', process.env);
