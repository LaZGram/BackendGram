import { Injectable } from '@nestjs/common';
import { CreateDebitcardDto } from './dto/create-debitcard.dto';
import { UpdateDebitcardDto } from './dto/update-debitcard.dto';

@Injectable()
export class DebitcardService {
  create(createDebitcardDto: CreateDebitcardDto) {
    return 'This action adds a new debitcard';
  }

  findAll() {
    return `This action returns all debitcard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debitcard`;
  }

  update(id: number, updateDebitcardDto: UpdateDebitcardDto) {
    return `This action updates a #${id} debitcard`;
  }

  remove(id: number) {
    return `This action removes a #${id} debitcard`;
  }
}
