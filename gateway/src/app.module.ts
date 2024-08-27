import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { RequesterController } from './requester/requester.controller';
<<<<<<< HEAD
import { ShopController } from './shop/shop.controller';
=======
import { HelloController } from './hello/hello.controller';
>>>>>>> upstream/main

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
<<<<<<< HEAD
  controllers: [AppController, RequesterController, ShopController],
=======
  controllers: [AppController, RequesterController, HelloController],
>>>>>>> upstream/main
  providers: [AppService, ClientKafka],
})
export class AppModule {}