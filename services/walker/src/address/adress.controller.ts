import { Controller } from '@nestjs/common';
import { AdressService } from './adress.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @MessagePattern('updateWalkerAddress')
  updateWalkerAddress(msg: any): any {
    return this.adressService.updateWalkerAddress(msg);
  }

  @MessagePattern('getWalkerAddress')
  getWalkerAddress(msg: any): any {
    return this.adressService.getWalkerAddress(msg);
  }
}
