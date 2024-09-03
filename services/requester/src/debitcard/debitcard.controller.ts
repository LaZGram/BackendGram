import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DebitcardService } from './debitcard.service';
import { CreateDebitcardDto } from './dto/create-debitcard.dto';
import { UpdateDebitcardDto } from './dto/update-debitcard.dto';

@Controller()
export class DebitcardController {
  constructor(private readonly debitcardService: DebitcardService) {}

  @MessagePattern('createDebitcard')
  create(@Payload() createDebitcardDto: CreateDebitcardDto) {
    return this.debitcardService.create(createDebitcardDto);
  }

  @MessagePattern('findAllDebitcard')
  findAll() {
    return this.debitcardService.findAll();
  }

  @MessagePattern('findOneDebitcard')
  findOne(@Payload() id: number) {
    return this.debitcardService.findOne(id);
  }

  @MessagePattern('updateDebitcard')
  update(@Payload() updateDebitcardDto: UpdateDebitcardDto) {
    return this.debitcardService.update(updateDebitcardDto.id, updateDebitcardDto);
  }

  @MessagePattern('removeDebitcard')
  remove(@Payload() id: number) {
    return this.debitcardService.remove(id);
  }
}
