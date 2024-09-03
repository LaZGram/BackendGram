import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Controller()
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @MessagePattern('createRegistration')
  create(@Payload() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }

  @MessagePattern('findAllRegistration')
  findAll() {
    return this.registrationService.findAll();
  }

  @MessagePattern('findOneRegistration')
  findOne(@Payload() id: number) {
    return this.registrationService.findOne(id);
  }

  @MessagePattern('updateRegistration')
  update(@Payload() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationService.update(updateRegistrationDto.id, updateRegistrationDto);
  }

  @MessagePattern('removeRegistration')
  remove(@Payload() id: number) {
    return this.registrationService.remove(id);
  }
}
