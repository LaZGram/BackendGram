import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsObject, IsArray, IsDateString, IsBoolean } from 'class-validator';

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

export class RegisTWalkerDto {

  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: '1234567890' })
  phoneNumber: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profilePicture: string;

  @ApiProperty({ example: 'John Doe' })
  bankAccountName: string;

  @ApiProperty({ example: '123-456-789' })
  bankAccountNo: string;

  @ApiProperty({ example: '2024-09-25T12:34:56.000Z' })
  registerAt: Date;

  @ApiProperty({ example: '2024-09-25T12:55:58.000Z' })
  verifyAt: Date;

  @ApiProperty({ example: 'waitingVerify' })
  status: string;
}

export class OrderIdDto {
  @ApiProperty({ description: 'OrderId', example: '123', required: false })
  @IsNumber()
  orderId: number;
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

  @ApiProperty({ description: 'Status of the walker', example: 'Inactive', required: false })
  @IsBoolean()
  @IsOptional()
  status?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ description: 'The new status of the order', example: 'Confirmed' })
  @IsString()
  orderStatus: string;
}

export class ConfirmOrderDto {
  @ApiProperty({ description: 'Photo path for confirmation', example: 'https://example.com/photo.jpg' })
  @IsString()
  photoPath: string;
}

export class ConfirmOrderItemDto {
  @ApiProperty({
    description: 'ID of the order item to confirm',
    example: 3,
  })
  @IsNumber()
  orderItemId: number;

  @ApiProperty({
    description: 'Status of the order item (e.g., completed)',
    example: 'completed',
  })
  @IsString()
  orderItemStatus: string;
}

export class ConfirmOrderAllDto {
  @ApiProperty({
    description: 'ID of the order to confirm',
    example: 3,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'Status of the order (e.g., completed)',
    example: 'completed',
  })
  @IsString()
  orderStatus: string;
}

export class PostReportDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  orderId: number;
}

class AddressDto {
  @ApiProperty({ description: 'Name of the address', example: 'Home' })
  @IsString()
  name: string;

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

export class Cto {
  @ApiProperty({ example: 'Central Canteen' })
  name: string;

  @ApiProperty({ example: 13.7563 })
  latitude: number;

  @ApiProperty({ example: 100.5018 })
  longitude: number;
}

// Requester DTO
export class RequesterDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: '123456789' })
  phoneNumber: string;
}

// Shop DTO
export class ShopDto {
  @ApiProperty({ example: 'Pasta Paradise' })
  shopName: string;
}

// Menu DTO
export class MDto {
  @ApiProperty({ example: 'Spaghetti Carbonara' })
  name: string;

  @ApiProperty({ example: 12.99 })
  price: number;

  @ApiProperty({ type: ShopDto })
  shop: ShopDto;
}

// OrderItem DTO
export class OItemDto {
  @ApiProperty({ example: 3 })
  quantity: number;

  @ApiProperty({ example: 'Gluten-free pasta' })
  specialInstructions: string;

  @ApiProperty({ type: MDto })
  menu: MDto;
}

// Canteen DTO
export class CDto {
  @ApiProperty({ example: 'Central Canteen' })
  name: string;

  @ApiProperty({ example: 13.7563 })
  latitude: number;

  @ApiProperty({ example: 100.5018 })
  longitude: number;
}

// OrderLists DTO
export class OrderListsDto {
  @ApiProperty({ example: 8 })
  orderId: number;

  @ApiProperty({ example: 3 })
  amount: number;

  @ApiProperty({ example: 500 })
  totalPrice: number;

  @ApiProperty({ example: 50 })
  shippingFee: number;

  @ApiProperty({ example: '2024-09-25T12:34:56.000Z' })
  orderDate: Date;

  @ApiProperty({ example: 'inProgress' })
  orderStatus: string;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;

  @ApiProperty({ type: CDto })
  canteen: CDto;
}

// OrderHistory DTO
export class OrderHistoryDto {
  @ApiProperty({ example: 8 })
  orderId: number;

  @ApiProperty({ example: '2024-09-25T12:34:56.000Z' })
  orderDate: Date;

  @ApiProperty({ example: 'inProgress' })
  orderStatus: string;

  @ApiProperty({ example: 500 })
  totalPrice: number;

  @ApiProperty({ example: 50 })
  shippingFee: number;

  @ApiProperty({ example: 3 })
  amount: number;

  @ApiProperty({ example: '2024-09-25T13:00:00.000Z' })
  confirmedAt: Date;

  @ApiProperty({ type: Cto })
  canteen: Cto;

  @ApiProperty({ type: RequesterDto })
  requester: RequesterDto;

  @ApiProperty({ type: [OItemDto] })
  orderItem: OItemDto[];
}

export class GetOrderListDto {
  @ApiProperty({ description: 'Order status', example: 'inProgress' })
  @IsString()
  orderStatus: string;
}

export abstract class AbstractItemDto {
  @ApiProperty({ description: 'Quantity of the item', example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Special instructions for the item', example: 'No onions, extra cheese' })
  @IsString()
  specialInstructions: string;

  @ApiProperty({ description: 'Name of the menu item', example: 'Cheeseburger' })
  @IsString()
  menuName: string;

  @ApiProperty({ description: 'Price of the menu item', example: 9.99 })
  @IsNumber()
  price: number;
}

// Abstract DTO for order details within each shop
export abstract class AbstractOrderDto {
  @ApiProperty({ description: 'Order ID', example: 3 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'Order date', example: '2024-09-25T10:30:00.000Z' })
  @IsString()
  orderDate: string;

  @ApiProperty({ description: 'Order status', example: 'completed' })
  @IsString()
  orderStatus: string;

  @ApiProperty({ description: 'List of items in the order' })
  @IsArray()
  items: AbstractItemDto[];
}

// Abstract DTO for grouped order items by shop
export abstract class AbstractGroupedOrderItemsByShopDto {
  @ApiProperty({ description: 'Shop name', example: 'Burger House' })
  @IsString()
  shopName: string;

  @ApiProperty({ description: 'Orders for the shop' })
  @IsArray()
  orders: AbstractOrderDto[];
}

// Abstract DTOs for Address, Canteen, and Requester
export abstract class AbstractAddressDto {
  @ApiProperty({ description: 'Latitude of the address', example: 13.7563 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the address', example: 100.5018 })
  @IsNumber()
  longitude: number;
}

export abstract class AbstractCanteenDto {
  @ApiProperty({ description: 'Name of the canteen', example: 'Central Canteen' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Latitude of the canteen', example: 13.7563 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the canteen', example: 100.5018 })
  @IsNumber()
  longitude: number;
}

export abstract class AbstractRequesterDto {
  @ApiProperty({ description: 'Username of the requester', example: 'john_doe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Phone number of the requester', example: '123456789' })
  @IsString()
  phoneNumber: string;
}

// Concrete GetOrderDetailDto class with proper default value initialization
export class GetOrderDetailDto {
  @ApiProperty({ description: 'Order ID', example: 3 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'Order date', example: '2024-09-25T10:30:00.000Z' })
  @IsString()
  orderDate: string;

  @ApiProperty({ description: 'Order status', example: 'completed' })
  @IsString()
  orderStatus: string;

  @ApiProperty({ description: 'Amount of items in the order', example: 105.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Total price of the order', example: 100.5 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: 'Shipping fee', example: 5 })
  @IsNumber()
  shippingFee: number;

  @ApiProperty({ description: 'Address details' })
  @IsObject()
  address: AbstractAddressDto;

  @ApiProperty({ description: 'Canteen details' })
  @IsObject()
  canteen: AbstractCanteenDto;

  @ApiProperty({ description: 'Requester details' })
  @IsObject()
  requester: AbstractRequesterDto;

  @ApiProperty({ description: 'Grouped order items by shop' })
  @IsArray()
  groupedOrderItemsByShop: AbstractGroupedOrderItemsByShopDto[] = []; // Initialize with an empty array
}

// Example mock data using the DTO
const mockOrderDetail: GetOrderDetailDto = {
  orderId: 3,
  orderDate: '2024-09-25T10:30:00.000Z',
  orderStatus: 'completed',
  amount: 105.5,
  totalPrice: 100.5,
  shippingFee: 5,
  address: {
    latitude: 13.7563,
    longitude: 100.5018,
  },
  canteen: {
    name: 'Central Canteen',
    latitude: 13.7563,
    longitude: 100.5018,
  },
  requester: {
    username: 'john_doe',
    phoneNumber: '123456789',
  },
  groupedOrderItemsByShop: [
    {
      shopName: 'Burger House',
      orders: [
        {
          orderId: 3,
          orderDate: '2024-09-25T10:30:00.000Z',
          orderStatus: 'completed',
          items: [
            {
              quantity: 2,
              specialInstructions: 'No onions, extra cheese',
              menuName: 'Cheeseburger',
              price: 9.99,
            },
            {
              quantity: 2,
              specialInstructions: 'No onions',
              menuName: 'Cheeseburger',
              price: 9.99,
            },
          ],
        },
      ],
    },
  ],
};

export class GetRequesterIdByOrderDto {
  @ApiProperty({ description: 'OrderId', example: '1' })
  @IsNumber()
  orderId: number;
}

export class WalkerGetDto {

  @ApiProperty({ description: 'Id of the walker', example: 1 })
  @IsNumber()
  walkerId: number;

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

  @ApiProperty({ description: 'Status of the walker', example: 'Inactive' })
  @IsBoolean()
  status: string;

  @ApiProperty({ description: 'Registration date of the walker', example: '2023-09-09T10:00:00Z' })
  @IsDateString()
  registerAt: string;

  @ApiProperty({ description: 'Verification date of the walker', example: '2023-09-10T10:00:00Z' })
  @IsDateString()
  verifyAt: string;
}

export class AddressData{
  @ApiProperty({ description: 'Latitude of the address', example: 13.7563 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the address', example: 100.5018 })
  @IsNumber()
  longitude: number;
}