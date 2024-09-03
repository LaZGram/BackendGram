import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationDto } from './create-registration.dto';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  bankAccountName: string;
  bankAccountNo: string;
}
