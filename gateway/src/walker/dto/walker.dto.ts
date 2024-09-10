import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsObject, IsArray , IsDateString } from 'class-validator';

export class CreateWalkerDto {
  @ApiProperty({ description: 'Username of the walker', example: 'walker123' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email of the walker', example: 'walker@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Phone number of the walker', example: '555-1234' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Profile picture URL', example: 'https://example.com/profile.jpg' })
  @IsString()
  profilePicture: string;

  @ApiProperty({ description: 'Bank account name', example: 'John Doe' })
  @IsString()
  bankAccountName: string;

  @ApiProperty({ description: 'Bank account number', example: '12345678' })
  @IsString()
  bankAccountNo: string;
}

export class UpdateWalkerDto {
  @ApiProperty({ description: 'Username of the walker', example: 'walker123', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'Email of the walker', example: 'walker@example.com', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Phone number of the walker', example: '555-1234', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'Profile picture URL', example: 'https://example.com/profile.jpg', required: false })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({ description: 'Bank account name', example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  bankAccountName?: string;

  @ApiProperty({ description: 'Bank account number', example: '12345678', required: false })
  @IsString()
  @IsOptional()
  bankAccountNo?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ description: 'The new status of the order', example: 'Confirmed' })
  @IsString()
  status: string;
}

export class ConfirmOrderDto {
  @ApiProperty({ description: 'Photo path for confirmation', example: 'https://example.com/photo.jpg' })
  @IsString()
  photoPath: string;
}

export class PostReportDto {
  @ApiProperty({ description: 'Report date in ISO format', example: '2023-09-09T10:00:00Z' })
  @IsDateString()
  reportDate: string;

  @ApiProperty({ description: 'Title of the report', example: 'Order issue' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Detailed description of the issue', example: 'The walker did not deliver on time' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status of the report', example: 'Open' })
  @IsString()
  status: string;
}

class AddressDto {
  @ApiProperty({ description: 'Latitude of the address', example: 13.7563 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the address', example: 100.5018 })
  @IsNumber()
  longitude: number;
}

class CanteenDto {
  @ApiProperty({ description: 'Canteen name', example: 'Central Canteen' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Canteen latitude', example: 13.7563 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Canteen longitude', example: 100.5018 })
  @IsNumber()
  longitude: number;
}

class WalkerDto {
  @ApiProperty({ description: 'Walker username', example: 'walker01' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Walker phone number', example: '089-123-4567' })
  @IsString()
  phoneNumber: string;
}

class MenuDto {
  @ApiProperty({ description: 'Menu item name', example: 'Pad Thai' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Menu item price', example: 50 })
  @IsNumber()
  price: number;
}

class OrderItemDto {
  @ApiProperty({ description: 'Quantity of the order item', example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Special instructions for the order item', example: 'No peanuts' })
  @IsString()
  specialInstructions: string;

  @ApiProperty({ description: 'Menu details' })
  @IsObject()
  menu: MenuDto;
}

export class GetOrderListDto {
    @ApiProperty({ description: 'Order ID', example: '12345' })
    @IsString()
    orderId: string;
  
    @ApiProperty({ description: 'Amount of items in the order', example: 3 })
    @IsNumber()
    amount: number;
  
    @ApiProperty({ description: 'Total price of the order', example: 150.00 })
    @IsNumber()
    totalPrice: number;
  
    @ApiProperty({ description: 'Shipping fee', example: 20.00 })
    @IsNumber()
    shippingFee: number;
  
    @ApiProperty({ description: 'Order status', example: 'Delivered' })
    @IsString()
    orderStatus: string;
  
    @ApiProperty({ description: 'Address details' })
    @IsObject()
    address: AddressDto;
  
    @ApiProperty({ description: 'Canteen details' })
    @IsObject()
    canteen: CanteenDto;
  }

export class GetOrderDetailDto {
  @ApiProperty({ description: 'Order ID', example: '12345' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'Order date', example: '2023-09-09' })
  @IsString()
  orderDate: string;

  @ApiProperty({ description: 'Order status', example: 'Delivered' })
  @IsString()
  orderStatus: string;

  @ApiProperty({ description: 'Amount of items in the order', example: 3 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Total price of the order', example: 150.00 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: 'Shipping fee', example: 20.00 })
  @IsNumber()
  shippingFee: number;

  @ApiProperty({ description: 'Address details' })
  @IsObject()
  address: AddressDto;

  @ApiProperty({ description: 'Canteen details' })
  @IsObject()
  canteen: CanteenDto;

  @ApiProperty({ description: 'Walker details' })
  @IsObject()
  walker: WalkerDto;

  @ApiProperty({ description: 'Order items' })
  @IsArray()
  orderItem: OrderItemDto[];
}

export class GetRequesterIdByOrderDto {
  @ApiProperty({ description: 'Requester ID', example: '12345' })
  @IsString()
  requesterId: string;
}

export class walkerGetDto {
  @ApiProperty({ description: 'Username of the walker', example: 'walker123' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email of the walker', example: 'walker@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Phone number of the walker', example: '555-1234' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'Profile picture URL', example: 'https://example.com/profile.jpg' })
  @IsString()
  profilePicture: string;

  @ApiProperty({ description: 'Bank account name', example: 'John Doe' })
  @IsString()
  bankAccountName: string;

  @ApiProperty({ description: 'Bank account number', example: '12345678' })
  @IsString()
  bankAccountNo: string;
}