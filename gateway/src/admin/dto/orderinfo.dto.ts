import { ApiProperty } from '@nestjs/swagger';

// Define Photo DTO
class Photo123 {
  @ApiProperty({ description: 'ID of the photo', example: 1 })
  photoId: number;

  @ApiProperty({ description: 'URL of the photo', example: 'https://example.com/photo.jpg' })
  photoPath: string;

  @ApiProperty({ description: 'Type of the photo', example: 'order' })
  photoType: string;
}

// Define Menu DTO
class Menu123 {
  @ApiProperty({ description: 'ID of the menu item', example: 1 })
  menuId: number;

  @ApiProperty({ description: 'Name of the menu item', example: 'Pizza Margherita' })
  name: string;

  @ApiProperty({ description: 'Price of the menu item', example: 12.5 })
  price: number;
}

// Define OptionItem DTO (for options in the menu)
class OptionItem123 {
  @ApiProperty({ description: 'ID of the option item', example: 1 })
  optionItemId: number;

  @ApiProperty({ description: 'Name of the option item', example: 'Extra Cheese' })
  name: string;

  @ApiProperty({ description: 'Price of the option item', example: 1.5 })
  price: number;
}

// Define OrderItemExtra DTO
class OrderItemExtra123 {
  @ApiProperty({ description: 'ID of the order item extra', example: 2 })
  orderItemExtraId: number;

  @ApiProperty({ type: () => OptionItem123, description: 'Option item details' })
  optionItem: OptionItem123;
}

// Define OrderItem DTO
class OrderItem123 {
  @ApiProperty({ description: 'ID of the order item', example: 2 })
  orderItemId: number;

  @ApiProperty({ description: 'Quantity of the menu item', example: 1 })
  quantity: number;

  @ApiProperty({ description: 'Total price of the order item', example: 50 })
  totalPrice: number;

  @ApiProperty({ description: 'Special instructions for the order item', example: 'No onions' })
  specialInstructions: string;

  @ApiProperty({ description: 'Status of the order item', example: 'completed' })
  orderItemStatus: string;

  @ApiProperty({ description: 'Date when the order item was created', example: '2023-10-15T12:00:00.000Z' })
  orderItemDate: Date;

  @ApiProperty({ description: 'Date when the order item was completed', example: '2024-10-15T12:36:40.832Z' })
  completedDate: Date;

  @ApiProperty({ type: () => Photo123, description: 'Photo associated with this order item' })
  Photo: Photo123;

  @ApiProperty({ description: 'ID of the shop from which the item was ordered', example: 1 })
  shopId: number;

  @ApiProperty({ type: () => Menu123, description: 'Menu details for the order item' })
  menu: Menu123;

  @ApiProperty({ type: [OrderItemExtra123], description: 'List of extras selected for the order item' })
  orderItemExtra: OrderItemExtra123[];
}

// Define Requester DTO
class Requester123 {
  @ApiProperty({ description: 'ID of the requester', example: 2 })
  requesterId: number;

  @ApiProperty({ description: 'Phone number of the requester', example: '0987654321' })
  phoneNumber: string;
}

// Define Walker DTO
class Walker123 {
  @ApiProperty({ description: 'ID of the walker', example: 1 })
  walkerId: number;

  @ApiProperty({ description: 'Phone number of the walker', example: '1231231234' })
  phoneNumber: string;
}

// Define Canteen DTO
class CanteenResponse123 {
  @ApiProperty({ description: 'ID of the canteen', example: 1 })
  canteenId: number;

  @ApiProperty({ description: 'Name of the canteen', example: 'Canteen 1' })
  name: string;
}

// Define Address DTO
class Address123 {
  @ApiProperty({ description: 'ID of the address', example: 3 })
  addressId: number;

  @ApiProperty({ description: 'Name of the address', example: 'Home' })
  name: string;

  @ApiProperty({ description: 'Detailed address', example: '123 Main St' })
  detail: string;

  @ApiProperty({ description: 'Additional notes for the address', example: 'Leave at door' })
  note: string;

  @ApiProperty({ description: 'Latitude of the address', example: 40.7128 })
  latitude: number;

  @ApiProperty({ description: 'Longitude of the address', example: -74.006 })
  longitude: number;
}

// Define GetOrderInfoResponse DTO
export class GetOrderInfoDTO123 {
  @ApiProperty({ description: 'ID of the order', example: 3 })
  orderId: number;

  @ApiProperty({ description: 'Date when the order was placed', example: '2023-10-15T12:00:00.000Z' })
  orderDate: Date;

  @ApiProperty({ description: 'Current status of the order', example: 'completed' })
  orderStatus: string;

  @ApiProperty({ description: 'Total price of the order', example: 150 })
  totalPrice: number;

  @ApiProperty({ description: 'Shipping fee for the order', example: 5 })
  shippingFee: number;

  @ApiProperty({ description: 'Total amount of the order', example: 155 })
  amount: number;

  @ApiProperty({ description: 'Date when the order was confirmed', example: '2024-10-15T12:36:17.134Z' })
  confirmedAt: Date;

  @ApiProperty({ type: () => Requester123, description: 'Details of the requester who placed the order' })
  requester: Requester123;

  @ApiProperty({ type: () => Walker123, description: 'Details of the walker assigned to the order' })
  walker: Walker123;

  @ApiProperty({ type: () => Photo123, description: 'Photo associated with the order' })
  Photo: Photo123;

  @ApiProperty({ type: () => CanteenResponse123, description: 'Details of the canteen from which the order was placed' })
  canteen: CanteenResponse123;

  @ApiProperty({ type: () => Address123, description: 'Delivery address for the order' })
  address: Address123;

  @ApiProperty({ type: [OrderItem123], description: 'List of items in the order' })
  orderItem: OrderItem123[];
}
