import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminLoginDto, CreateAdminDto } from './dto/admin.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createAdmin')
  createAdmin(msg: CreateAdminDto){
    return this.appService.createAdmin(msg);
  }

  @MessagePattern('adminLogin')
  adminLogin(msg: AdminLoginDto){
    return this.appService.loginAdmin(msg);
  }

  @MessagePattern('walkerQueue')
  walkerQueue(): Promise<any> {
    return this.appService.walkerQueue();
  }

  @MessagePattern('showRequester')
  showRequester(): Promise<any> {
    return this.appService.showRequester();
  }

  @MessagePattern('showWalker')
  showWalker(): Promise<any> {
    return this.appService.showWalker();
  }

  @MessagePattern('showOrder')
  showOrder(): Promise<any> {
    return this.appService.showOrder();
  }

  @MessagePattern('postApproval')
  postApproval(msg: any): any {
    return this.appService.postApproval(msg);
  }
  
  @MessagePattern('verifyWalker')
  verifyWalker(msg: any): any {
    return this.appService.verifyWalker(msg);
  }

  @MessagePattern('deleteWalker')
  deleteWalker(msg: any): any {
    return this.appService.deleteWalker(msg);
  }
}
