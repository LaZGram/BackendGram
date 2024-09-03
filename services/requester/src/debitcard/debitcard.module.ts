import { Module } from '@nestjs/common';
import { DebitcardService } from './debitcard.service';
import { DebitcardController } from './debitcard.controller';

@Module({
  controllers: [DebitcardController],
  providers: [DebitcardService],
})
export class DebitcardModule {}
