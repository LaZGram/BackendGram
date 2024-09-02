export class OrderItemExtra {
  optionItemId: number;
  selected: boolean;
}

export class OrderItem {
  shopId: number;
  quantity: number;
  totalPrice: number;
  specialInstructions: string;
  menuId: number;
  orderItemExtras: OrderItemExtra[];
}

export class CreateOrderDto {
  requesterId: number;
  canteenId: number;
  addressId: number;
  orderItems: OrderItem[];
  totalPrice: number;
  shippingFee: number;
  amount: number;
  orderDate: Date;
  transactionType: string;
  transactionDate: Date;
}
