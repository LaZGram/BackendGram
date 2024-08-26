import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

import { HelloDto } from '../../dtos/hello.dto';

@Controller('hello')
export class HelloController {
    constructor(@Inject('KAFKA') private client: ClientKafka) { }

    @Get('hello')
    async getHello(): Promise<string> {
        let helloDto = new HelloDto();
        helloDto.message = "Hello Kafka!";
        console.log(helloDto);
        const result = await this.client.send('hello', helloDto);
        const value = await lastValueFrom(result);
        return value
    }
}
