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
