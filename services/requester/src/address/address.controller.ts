import { Controller } from '@nestjs/common';
import { AddressService } from './address.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern('createAddress')
  createAddress(@Payload() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @MessagePattern('updateAddress')
  updateAddress(@Payload() updateAddressDto: UpdateAddressDto) {
    return this.addressService.updateAddress(updateAddressDto);
  }

  @MessagePattern('deleteAddress')
  deleteAddress(@Payload() msg: object) {
    const addressId = parseInt(msg["addressId"].toString());
    return this.addressService.deleteAddress(addressId);
  }

  @MessagePattern('getAddress')
  getAddress(@Payload() msg: object) {
    return this.addressService.getAddress(msg["authId"].toString());
  }

  @MessagePattern('getAddressInfo')
  getAddressInfo(@Payload() msg: object) {
    const addressId = parseInt(msg["addressId"].toString());
    return this.addressService.getAddressInfo(addressId);
  }
}
