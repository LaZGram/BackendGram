import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';

@Controller()
export class AppController {
  constructor(@Inject() private client: ClientKafka) {}
  private admin: Admin;
  private readonly appService: AppService;

  @Get('/hello')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  async getHello() {
    const fibo = await this.getHello();
    return fibo;
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf('hello');


    const kafka = new Kafka({
      clientId: 'api_gateway',
      brokers: ['kafka:9092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    const topicList = [];
    if (!topics.includes('hello')) {
      topicList.push({
        topic: 'hello',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (!topics.includes('hello.reply')) {
      topicList.push({
        topic: 'hello.reply',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }
}
