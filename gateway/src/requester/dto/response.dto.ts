import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressResponseDto {
  @ApiProperty()
  addressId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  detail: string
  @ApiProperty()
  note: string
  @ApiProperty()
  latitude: number
  @ApiProperty()
  longitude: number
  @ApiProperty()
  authId: string
  @ApiProperty()
  default: boolean
}

export class UpdateAddressResponseDto extends CreateAddressResponseDto {}

export class DeleteAddressResponseDto extends CreateAddressResponseDto {}

export class GetAddressResponseDto extends CreateAddressResponseDto {}

export class GetAddressInfoResponseDto extends CreateAddressResponseDto {}


export class OrderItemExtra {
  @ApiProperty()
  optionItemId: number;
  @ApiProperty()
  selected: boolean;
}

export class OrderItem {
  @ApiProperty()
  shopId: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  specialInstructions: string;
  @ApiProperty()
  menuId: number;
  @ApiProperty()
  orderItemStatus: string;
  @ApiProperty()
  orderItemDate: Date;
  @ApiProperty()
  completedDate: Date;
  @ApiProperty({type: [OrderItemExtra]})
  orderItemExtras: OrderItemExtra;
}

export class CreateOrderResponseDto {
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  authId: string;
  @ApiProperty()
  canteenId: number;
  @ApiProperty()
  addressId: number;
  @ApiProperty({type: [OrderItem]})
  orderItems: OrderItem;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  shippingFee: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  orderDate: Date;
  @ApiProperty()
  transactionType: string;
  @ApiProperty()
  transactionDate: Date;
}

export class CancelOrderResponseDto extends CreateOrderResponseDto {}

export class CreateReportResponseDto {
  @ApiProperty()
  reportId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  authId: string;
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  reportDate: Date;
}

export class GetReportResponseDto extends CreateReportResponseDto {}

class Canteen{
  @ApiProperty()
  canteenId: number;
  @ApiProperty()
  name: string;
}

class address{
  @ApiProperty()
  addressId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  detail: string;
  @ApiProperty()
  note: string;
}

class shop{
  @ApiProperty()
  shopId: number;
  @ApiProperty()
  shopName: string;
  @ApiProperty()
  profilePicture: string;
}

class menu{
  @ApiProperty()
  menuId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
}

class optionItem{
  @ApiProperty()
  optionItemId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
}

class orderItemExtra{
  @ApiProperty()
  orderItemExtraId: number;
  @ApiProperty()
  optionItem: optionItem;
}

class orderItem{
  @ApiProperty()
  orderItemId: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  specialInstructions: string;
  @ApiProperty({type: shop})
  shop: shop;
  @ApiProperty({type: menu})
  menu: menu;
  @ApiProperty({type: [orderItemExtra]})
  orderItemExtra: orderItemExtra[];
}

export class ReqGetOrderInfoResponseDto {
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  orderDate: Date;
  @ApiProperty()
  orderStatus: string;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  shippingFee: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  confirmAt: Date;
  @ApiProperty()
  adminId: number;
  @ApiProperty()
  addressId: number;
  @ApiProperty()
  requesterId: number;
  @ApiProperty()
  walkerId: number;
  @ApiProperty()
  canteenId: number;
  @ApiProperty()
  transactionId: number;
  @ApiProperty()
  photoId: number;
  @ApiProperty({type: Canteen})
  canteen: Canteen;
  @ApiProperty({type: address})
  address: address;
  @ApiProperty({type: [orderItem]})
  orderItem: orderItem;
}

class requester{
  @ApiProperty()
  requesterId: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  profilePicture: string;
}

export class GetReviewInfoResponse {
  @ApiProperty({ type: shop})
  shop: shop;
  @ApiProperty({ type: requester})
  requester: requester;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  comment: string;
}

export class GetReviewByOrderResponse {
  @ApiProperty()
  shopId: number;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  comment: string;
}