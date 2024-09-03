import { PartialType } from '@nestjs/mapped-types';
import { CreateDebitcardDto } from './create-debitcard.dto';

export class UpdateDebitcardDto extends PartialType(CreateDebitcardDto) {
  id: number;
  cardNumber: String;
  expiryDate: String;
  cvv: String;
  requesterId: number;
}
