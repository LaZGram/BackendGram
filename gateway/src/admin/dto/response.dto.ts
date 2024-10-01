import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminResponseDto {
  @ApiProperty()
  token: string;
}

export class AdminLoginResponseDto {
  @ApiProperty()
  token: string;
}

export class Order{
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
}

export class GetToDayOrderResponse {
  @ApiProperty({type: Order})
  order: Order;
}

export class Requester{
  @ApiProperty()
  requesterId: number;
  @ApiProperty()
  phoneNumber: string;
}

export class Walker{
  @ApiProperty()
  walkerId: number;
  @ApiProperty()
  phoneNumber: string;
}

export class CanteenResponse{
  @ApiProperty()
  canteenId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}

export class Address{
  @ApiProperty()
  addressId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  detail: string;
  @ApiProperty()
  note: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}

export class Photo{
  @ApiProperty()
  photoId: number;
  @ApiProperty()
  photoPath: string;
  @ApiProperty()
  uploadedAt: Date;
}

export class OptionItem {
  @ApiProperty()
  optionItemId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
}

export class OrderItemExtra {
  @ApiProperty()
  orderItemExtraId: number
  @ApiProperty()
  optionItem: OptionItem
}

export class Menu {
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
}

export class OrderItem{
  @ApiProperty()
  orderItemId: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  specialInstructions: string;
  @ApiProperty()
  shopId: number;
  @ApiProperty()
  orderItemStatus: string;
  @ApiProperty()
  orderItemDate: Date;
  @ApiProperty()
  completedDate: Date;
  @ApiProperty()
  orderId: number;
  @ApiProperty({type:[Menu]})
  menu: Menu[];
  @ApiProperty({type:[OrderItemExtra]})
  orderItemExtra: OrderItemExtra[];
}

export class GetOrderInfoResponse {
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  orderDate: Date;
  @ApiProperty()
  orderStatus: string;
  @ApiProperty({type: Requester})
  requester: Requester;
  @ApiProperty({type: Walker})
  walker: Walker;
  @ApiProperty({type: Photo})
  Photo: Photo;
  @ApiProperty({type: CanteenResponse})
  canteen: CanteenResponse;
  @ApiProperty({type: Address})
  address: Address;
  @ApiProperty({type: [OrderItem]})
  orderItem: OrderItem[];
}

export class SearchOrderResponse extends GetToDayOrderResponse {}

export class FilterOrderResponse extends GetToDayOrderResponse {}

export class Report{
  @ApiProperty()
  reportId: number;
  @ApiProperty()
  reportDate: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  requesterId: number;
  @ApiProperty()
  walkerId: number;
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  adminId: number;
  @ApiProperty()
  reportBy: string;
}

export class GetReportResponse {
  @ApiProperty({type: Report})
  report: Report;
}

export class GetReportInfoResponse {
  @ApiProperty()
  reportId: number;
  @ApiProperty()
  reportDate: Date;
  @ApiProperty()
  status: string;
  @ApiProperty({type: Requester})
  requester: Requester;
  @ApiProperty()
  orderId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}

export class SearchReportResponse extends GetReportResponse {}

export class FilterReportResponse extends GetReportResponse {}

export class GetShopInCanteenResponse {
  @ApiProperty()
  shopId: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  shopName: string;
  @ApiProperty()
  profilePicture: string;
  @ApiProperty()
  tel: string;
  @ApiProperty()
  shopNumber: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  canteenId: number;
}

export class GetShopInfoResponse extends GetShopInCanteenResponse {}

export class GetShopMenuResponse {
  @ApiProperty()
  menuId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  picture: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  shopId: number;
}

export class GetShopOrderResponse {
  @ApiProperty()
  orderItemId: number
  @ApiProperty()
  quantity: number
  @ApiProperty()
  totalPrice: number
  @ApiProperty()
  specialInstructions: string
  @ApiProperty()
  shopId: number
  @ApiProperty({description: '"lookingForWalker", "inProgress", "completed", "cancelled"'})
  orderItemStatus: string
  @ApiProperty()
  orderItemDate: Date
  @ApiProperty()
  completedDate: Date
  @ApiProperty()
  orderId: number
  @ApiProperty()
  menuId: number
}