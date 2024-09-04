import { Controller, Get, HttpException, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

import { HelloDto } from '../dtos/hello.dto';

import { UseGuards, Request, Query, Body } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from 'src/dtos/jwt.dto';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateJwtDto, TokenDto } from './dto/hello.dto';


@ApiTags('TEST-HELLO')
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
    @ApiOperation({ summary: 'Generate a JWT for testing' })
    @ApiResponse({ status: 201, description: 'JWT has been generated.', type: TokenDto })
    async CreateJwt(@Request() req, @Body() body:CreateJwtDto): Promise<TokenDto> {
        console.log(process.env.JWT_SECRET);
        if (!body.authId) {
            throw new HttpException('authId is required', 400);
        }
        const token = await this.JwtService.signAsync( { authId: body.authId });
        let tokenDto = new TokenDto();
        tokenDto.token = token;
        return tokenDto;
    }
}