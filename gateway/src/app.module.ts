import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { RequesterController } from './requester/requester.controller';
import { CanteenController } from './canteen/canteen.controller';
import { WalkerController } from './walker/walker.controller';
import { HelloController } from './hello/hello.controller';
import { ShopController } from './shop/shop.controller';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

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
    ConfigModule.forRoot({
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
      isGlobal: true,
    }),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '100d' },
    }),
  ],
  controllers: [AppController, RequesterController, HelloController, ShopController, CanteenController, WalkerController],
  providers: [AppService, ClientKafka, 
  {
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  },
],
})
export class AppModule {}