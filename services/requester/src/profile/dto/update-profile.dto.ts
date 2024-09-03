import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  // authId?: null;
  addressId?: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}
