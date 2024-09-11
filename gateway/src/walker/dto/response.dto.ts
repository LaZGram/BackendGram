import { ApiProperty } from "@nestjs/swagger";

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

export class AcceptOrderResponseDto {
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