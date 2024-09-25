import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { env } from 'process';
import { join } from 'path';
import * as express from 'express'; // Import express

async function bootstrap() {
  // Create the HTTP server alongside the Kafka microservice
  const app = await NestFactory.create(AppModule);

  // Serve index.html as a fallback route
  app.use(express.static(join(__dirname, '..', 'public'))); // Serve static files from the public directory

  // Add the catch-all route
  app.use((req, res, next) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  // Start the Kafka microservice
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `${env.SERVICE_NAME}-${uuidv4()}`,
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: `${env.SERVICE_NAME}-consumer`,
        },
      },
    },
  );
  
  await app.listen(3000);  // Ensure the HTTP server is running on port 3000
  await microservice.listen();  // Ensure the Kafka microservice is running
}

bootstrap();
