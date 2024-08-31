import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionRequestDto } from './create-option-request.dto';


export class EditOptionRequestDto extends PartialType(CreateOptionRequestDto) {
  optionId: number;
}
