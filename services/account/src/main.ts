import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
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
  await app.listen();
}
bootstrap();
