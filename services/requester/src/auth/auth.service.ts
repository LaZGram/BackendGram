import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library'
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    private client: OAuth2Client;
    private GOOGLE_CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
    constructor(private readonly jwtService: JwtService, private prisma: PrismaService) {
        this.client = new OAuth2Client(this.GOOGLE_CLIENT_ID);
    }

    async verifyGoogleToken(idToken: string) {
        try {
            const ticket = await this.client.verifyIdToken({
            idToken,
            audience: this.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { sub, email, name, picture } = payload;
            const authId = sub;

            const sessionToken = this.jwtService.sign(
            {
                authId: authId,
                email,
                name,
                picture,
            },
            { expiresIn: '1h' }
            );

            return {
            sessionToken,
            user: {
                authId: authId,
                email,
                name,
                picture,
            },
            };
        } catch (error) {
            console.error('Error verifying Google idToken:', error);
            throw new Error('Invalid token');
        }
    }

    async sessionTokenSave(authId: string, sessionToken: string, tokenId: string) {
        return await this.prisma.authorization.upsert({
            where: {
                authId,
            },
            update: {
            },
            create: {
                authId,
                tokenId
            },
        });
    }

    async existsRequester(authId: string) {
        const requester = await this.prisma.requester.findUnique({
            where: {
                authId,
            },
        });
        return requester;
    }

    async existsWalker(authId: string) {
        const walker = await this.prisma.walker.findUnique({
            where: {
                authId,
            },
        });
        return walker;
    }

    async createAuthId(msg: any) {
        const authId = await this.prisma.authorization.create({
            data: {
                tokenId: msg.authId,
                authId: msg.authId,
            },
        });
        return authId;
    }
}
