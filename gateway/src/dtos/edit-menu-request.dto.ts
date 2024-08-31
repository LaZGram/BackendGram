import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuRequestDto } from './create-menu-request.dto';


export class EditMenuRequestDto extends PartialType(CreateMenuRequestDto) {
  menuId: number;
}