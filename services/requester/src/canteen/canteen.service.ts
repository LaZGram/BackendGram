import { Injectable } from '@nestjs/common';
import { CreateCanteenDto } from './dto/create-canteen.dto';
import { UpdateCanteenDto } from './dto/update-canteen.dto';

@Injectable()
export class CanteenService {
  create(createCanteenDto: CreateCanteenDto) {
    return 'This action adds a new canteen';
  }

  findAll() {
    return `This action returns all canteen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canteen`;
  }

  update(id: number, updateCanteenDto: UpdateCanteenDto) {
    return `This action updates a #${id} canteen`;
  }

  remove(id: number) {
    return `This action removes a #${id} canteen`;
  }
}
