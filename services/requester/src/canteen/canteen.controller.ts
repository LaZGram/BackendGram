import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CanteenService } from './canteen.service';
import { CreateCanteenDto } from './dto/create-canteen.dto';
import { UpdateCanteenDto } from './dto/update-canteen.dto';

@Controller()
export class CanteenController {
  constructor(private readonly canteenService: CanteenService) {}

  // @MessagePattern('createCanteen')
  // create(@Payload() createCanteenDto: CreateCanteenDto) {
  //   return this.canteenService.create(createCanteenDto);
  // }

  @MessagePattern('findAllCanteen')
  findAll() {
    return this.canteenService.findAll();
  }

  @MessagePattern('findOneCanteen')
  findOne(@Payload() id: number) {
    return this.canteenService.findOne(id);
  }

  @MessagePattern('updateCanteen')
  update(@Payload() updateCanteenDto: UpdateCanteenDto) {
    return this.canteenService.update(updateCanteenDto.id, updateCanteenDto);
  }

  @MessagePattern('removeCanteen')
  remove(@Payload() id: number) {
    return this.canteenService.remove(id);
  }
}
