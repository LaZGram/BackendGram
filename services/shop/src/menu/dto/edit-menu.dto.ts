import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';

export class EditMenuDto extends PartialType(CreateMenuDto) {
  menuId: number;
  status: boolean;
}
