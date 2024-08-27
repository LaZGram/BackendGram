import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { RequesterController } from './requester/requester.controller';
import { ShopController } from './shop/shop.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'kafka-microservices',
          },
        },
      },
    ]),
  ],
  controllers: [AppController, RequesterController, ShopController],
  providers: [AppService, ClientKafka],
})
export class AppModule {}