import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('googleAuth')
  async requesterRegistration(@Payload() msg:any ) : Promise<string> {
    try {
      let { sessionToken, user } = await this.authService.verifyGoogleToken(msg.token);
      console.log('user:', JSON.stringify(user));
      await this.authService.sessionTokenSave(user.authId, sessionToken, msg.token);
      const requester = await this.authService.existsRequester(user.authId);
      const walker = await this.authService.existsWalker(user.authId);
      console.log(JSON.stringify({ sessionToken, "alradyRegistered": (requester != null), "alradyRegisteredWalker": (walker != null) }));
      if(requester == null) {
        
      }
      return JSON.stringify({ sessionToken, "alradyRegistered": (requester != null), "alradyRegisteredWalker": (walker != null) });
    } catch (error) {
      console.error('Error verifying Google idToken:', error);
      return JSON.stringify({ error: 'Invalid token' });
    }
  }

  @MessagePattern('authIdCreate')
  async authIdCreate(@Payload() msg: any): Promise<string> {
    try {
      const authId = await this.authService.createAuthId(msg);
      return JSON.stringify({ authId });
    } catch (error) {
      console.error('Error creating authId:', error);
      return JSON.stringify({ error: 'Error creating authId' });
    }
  }
}
