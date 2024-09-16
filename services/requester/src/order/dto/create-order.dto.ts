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
  authId: string;
  canteenId: number;
  addressId: number;
  orderItems: OrderItem[];
  totalPrice: number;
  shippingFee: number;
  amount: number;
  transactionType: string;
  transactionDate: Date;
}
