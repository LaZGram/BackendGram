import { Module } from '@nestjs/common';
import { CanteenService } from './canteen.service';
import { CanteenController } from './canteen.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_CANTEEN',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'canteen',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'micro-shop-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [CanteenController],
  providers: [CanteenService, ClientKafka],
})
export class CanteenModule {}
