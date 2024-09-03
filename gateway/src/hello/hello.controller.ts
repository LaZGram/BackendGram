import { Controller, Get, HttpException, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

import { HelloDto } from '../dtos/hello.dto';

import { UseGuards, Request, Query, Body } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from 'src/dtos/jwt.dto';

@Controller('hello')
export class HelloController {
    constructor(@Inject('KAFKA') private client: ClientKafka, private JwtService: JwtService) { }

    @Get('hello')
    async getHello(@Request() req): Promise<string> {
        const jwt: JwtDto = req.jwt;
        let helloDto = new HelloDto();
        helloDto.message = `Hello ${jwt.authId}`;
        const result = await this.client.send('hello', JSON.stringify(helloDto));
        const value = await lastValueFrom(result);
        return value
    }

    @SetMetadata('isPublic', true)
    @Post('jwt')
    async CreateJwt(@Request() req, @Body() body): Promise<string> {
        console.log(process.env.JWT_SECRET);
        if (!body.authId) {
            throw new HttpException('authId is required', 400);
        }
        const token = await this.JwtService.signAsync( { authId: body.authId });
        return token;
    }
}
