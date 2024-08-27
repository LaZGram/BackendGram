import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { lastValueFrom, Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('KAFKA') private client: ClientKafka, private appService: AppService) { }
  private admin: Admin;

  @Get('/hello')
  async getHello(): Promise<string> {
    const result = await this.client.send('hello', 'Hello Kafka!');
    const value = await lastValueFrom(result);
    return value
  }

  async onModuleInit() {
    const topic_list = ['hello', 'requesterRegistration', 'createMenu'];
    topic_list.forEach(async (topic) => {
      await this.client.subscribeToResponseOf(topic);
    });


    const kafka = new Kafka({
      clientId: 'api_gateway',
      brokers: ['kafka:9092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    const topicList = [];
    topic_list.forEach((topic) => {
      if (!topics.includes(topic)) {
        topicList.push({
          topic,
          numPartitions: 1,
        });
      }
      if (!topics.includes(`${topic}.reply`)) {
        topicList.push({
          topic: `${topic}.reply`,
          numPartitions: 1,
        });
      }
    });

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }
}
