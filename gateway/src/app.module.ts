import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { RequesterController } from './requester/requester.controller';
import { CanteenController } from './canteen/canteen.controller';
import { ProfileController } from './profile/profile.controller';

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
  // controllers: [AppController, RequesterController, HelloController],
  controllers: [AppController, RequesterController, CanteenController, ProfileController],
  providers: [AppService, ClientKafka],
})
export class AppModule {}