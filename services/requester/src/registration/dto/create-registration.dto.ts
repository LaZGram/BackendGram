export class CreateRegistrationDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture?: string;  // Optional field
  authId: number;           // Required field
  addressId: string;
  cardNumber?: string;      // Optional field
  expiryDate?: string;      // Optional field
  cvv?: string;             // Optional field
}
