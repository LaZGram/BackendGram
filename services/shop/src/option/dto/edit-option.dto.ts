import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';

export class EditOptionDto extends PartialType(CreateOptionDto) {
  optionId: number;
}
