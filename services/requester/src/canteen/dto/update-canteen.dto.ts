import { PartialType } from '@nestjs/mapped-types';
import { CreateCanteenDto } from './create-canteen.dto';

export class UpdateCanteenDto extends PartialType(CreateCanteenDto) {
  id: number;
  name: string;
  addressId: number;
  requesterId: number;
}
