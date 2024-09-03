export class CreateOrderDto {
    orderDate: Date;
    orderStatus: string;
    amount: number;
    totalPrice: number;
    shippingFee: number;
    adminId: number;
    addressId: number;
    requesterId: number;
    walkerId: number;
    canteenId: number;
    transactionId: number;
    orderItems: CreateOrderItemDto[];
  }
  
  export class CreateOrderItemDto {
    menuId: number;
    quantity: number;
    specialInstructions?: string;
  }
  