import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';
import { lastValueFrom, Observable } from 'rxjs';
import { CreateCanteenRequestDto } from './dtos';
import { CreateCanteenResponseDto } from './shop/dto/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(@Inject('KAFKA') private client: ClientKafka, private appService: AppService) { }
  private admin: Admin;

  @ApiTags('SHOP')
  @Post('create-canteen')
  @ApiOperation({ summary: 'Create new canteen to database' })
  @ApiResponse({ status: 201, description: 'Create new canteen successes', type: CreateCanteenResponseDto })
  async createCanteen(@Body() createCanteenRequest: CreateCanteenRequestDto): Promise<string> {
      const result = await this.client.send('createCanteen', JSON.stringify(createCanteenRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  async onModuleInit() {
    const address_topic_list = ['createAddress', 'updateAddress', 'deleteAddress', 'getAddress', 'getAddressInfo'];
    const order_topic_list = ['createOrder', 'getStatus', 'cancelOrder', 'getWalker', 'createReport'];
    const requester_topic_list = [...order_topic_list, ...address_topic_list, 'createDebitcard', 'searchMenu', 'postPersonalInfo', 'authIdCreate'];
    const menu_topic_list = ['createMenu', 'editMenu', 'deleteMenu', 'getMenu', 'getMenuInfo'];
    const option_topic_list = ['createOption', 'editOption', 'deleteOption', 'getOption', 'getOptionInfo'];
    const shop_topic_list = ['createShop', 'searchShop', 'shopReview', 'createCanteen', ...menu_topic_list, ...option_topic_list,];
    const walker_topic_list = ['createWalker', 'getWalker', 'updateWalker', 'deleteWalker', 'getWalkerInfo','postChangeProfilePicture', 'getDebitcard', 
      'postChangeDebitCard', 'walkerRegistration', 'walkerGet', 'getOrderList', 'getOrderDetail', 'confirmOrder', 'postReport'
    , 'getRequesterIdByOrder', 'updateWalkerProfile'];
    let topic_list = ['hello', 'requesterRegistration', 'getCanteens', 'getProfile', 'googleAuth', ...shop_topic_list, ...requester_topic_list, ...walker_topic_list];
    // unique topic
    topic_list = topic_list.filter((value, index, self) => self.indexOf(value) === index);
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
