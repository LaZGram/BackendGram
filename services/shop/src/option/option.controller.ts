import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { EditOptionDto } from './dto/edit-option.dto';

@Controller()
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @MessagePattern('createOption')
  create(@Payload() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @MessagePattern('editOption')
  edit(@Payload() editOptionDto: EditOptionDto) {
    return this.optionService.edit(editOptionDto.optionId, editOptionDto);
  }

  @MessagePattern('getOption')
  getOption(@Payload() msg: object) {
    const menuId = parseInt(msg["menuId"].toString());
    return this.optionService.getOption(menuId);
  }

  @MessagePattern('getOptionInfo')
  getOptionInfo(@Payload() msg: object) {
    const id = parseInt(msg["optionId"].toString());
    return this.optionService.getOptionInfo(id);
  }

  @MessagePattern('deleteOption')
  delete(@Payload() msg: object) {
    const id = parseInt(msg["optionId"].toString());
    return this.optionService.remove(id);
  }
}
