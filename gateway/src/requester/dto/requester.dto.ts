import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

// 1. CreateOrderRequestDto
export class CreateOrderRequestDto {
  @ApiProperty({ description: 'Unique ID for the order', example: 'order123' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'List of items in the order', example: ['item1', 'item2'] })
  @IsArray()
  items: string[];

  @ApiProperty({ description: 'Total amount for the order', example: 200 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ description: 'Address ID where the order will be delivered', example: 'address123' })
  @IsString()
  addressId: string;
}

// 2. CreateReportRequestDto
export class CreateReportRequestDto {
  @ApiProperty({ description: 'Order ID related to the report', example: 'order123' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'Type of report', example: 'delivery_issue' })
  @IsString()
  reportType: string;

  @ApiProperty({ description: 'Description of the report', example: 'The delivery was late.' })
  @IsString()
  description: string;
}

// 3. RequesterProfileDto
export class RequesterProfileDto {
  @ApiProperty({ description: 'Username of the requester', example: 'requester123' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email of the requester', example: 'requester@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'First name of the requester', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the requester', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '555-1234' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Profile picture URL', example: 'https://example.com/profile.jpg' })
  @IsString()
  profilePicture: string;

  @ApiProperty({ description: 'List of addresses associated with the requester', example: [{ addressId: 1, name: 'Home', detail: '123 Main St', note: 'Leave at the door', latitude: 13.7563, longitude: 100.5018 }] })
  @IsArray()
  address: [];

  @ApiProperty({ description: 'List of debit cards associated with the requester', example: [{ cardNumber: '4321-5678-9876-5432', expiryDate: '06/28', cvv: '321' }] })
  @IsArray()
  debitCard: [];
}

// 4. UpdateRequesterProfileDto
export class UpdateRequesterProfileDto {
  @ApiProperty({ description: 'Username of the requester', example: 'Johnny', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '555-1234', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

// 5. RequesterAddressDto
export class RequesterAddressDto {
  @ApiProperty({ description: 'The unique ID of the address', example: 1 })
  @IsNumber()
  addressId: number;

  @ApiProperty({ description: 'Name of the address', example: 'Home' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Additional address details', example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  detail?: string;

  @ApiProperty({ description: 'Notes about the address', example: 'Leave at the door', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Latitude coordinate of the address', example: 13.7563 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude coordinate of the address', example: 100.5018 })
  @IsNumber()
  longitude: number;
}

// 6. UpdateAddressRequestDto
export class UpdateAddressRequestDto {
  @ApiProperty({ description: 'Name of the address (e.g., Home, Work)', example: 'Home', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Additional address details', example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  detail?: string;

  @ApiProperty({ description: 'Notes about the address', example: 'Leave at the door', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Latitude coordinate of the address', example: 13.7563, required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ description: 'Longitude coordinate of the address', example: 100.5018, required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}

// 7. CreateDebitCardDto
export class CreateDebitCardDto {
  @ApiProperty({ description: 'Debit card number', example: '1234 5678 9012 3456' })
  @IsString()
  cardNumber: string;

  @ApiProperty({ description: 'Expiration date', example: '12/25' })
  @IsString()
  expiryDate: string;

  @ApiProperty({ description: 'CVV code', example: '123' })
  @IsString()
  cvv: string;
}

// 8. SearchMenuDto
export class SearchMenuDto {
  @ApiProperty({ description: 'Name of the menu item', example: 'Pad Thai' })
  @IsString()
  name: string;
}

// 9. RequesterCreateDto
export class RequesterCreateDto {
  @IsString()
  authId: string;

  @ApiProperty({ description: 'Username of the requester', example: 'john_doe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email address of the requester', example: 'john.doe@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'First name of the requester', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the requester', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '123456789' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Profile picture URL of the requester', example: 'https://example.com/profile-pic.jpg', required: false })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  // @ApiProperty({ description: 'ID of the address associated with the requester', example: 1, required: false })
  // @IsOptional()
  // @IsNumber()
  // addressId?: number;

  // @ApiProperty({ description: 'ID of the debit card associated with the requester', example: 1, required: false })
  // @IsOptional()
  // @IsNumber()
  // debitCardId?: number;
}

// 10. PostChangeDebitCardDto
export class PostChangeDebitCardDto {
  @ApiProperty({ description: 'The ID of the debit card to update', example: 1 })
  @IsNumber()
  debitCardId: number;

  @ApiProperty({ description: 'The new card number', example: '4321-5678-9876-5432' })
  @IsString()
  cardNumber: string;

  @ApiProperty({ description: 'The new expiry date', example: '06/28' })
  @IsString()
  expiryDate: string;

  @ApiProperty({ description: 'The new CVV', example: '321' })
  @IsString()
  cvv: string;
}

// 11. GetDebitCardDto
export class GetDebitCardDto {
  @ApiProperty({ description: 'The ID of the debit card to retrieve', example: 1 })
  @IsNumber()
  debitCardId: number;

  @ApiProperty({ description: 'The card number of the debit card', example: '4321-5678-9876-5432' })
  @IsString()
  cardNumber: string;

  @ApiProperty({ description: 'The expiry date of the debit card', example: '06/28' })
  @IsString()
  expiryDate: string;

  @ApiProperty({ description: 'The CVV of the debit card', example: '321' })
  @IsString()
  cvv: string;
}

// 12. PostChangeProfilePictureDto
export class PostChangeProfilePictureDto {
  @ApiProperty({ description: 'The new profile picture URL', example: 'https://example.com/profile-pic.jpg' })
  @IsString()
  profilePicture: string;
}
