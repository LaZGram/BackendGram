import { ApiProperty } from '@nestjs/swagger';

export class CreateCanteenResponseDto {
  @ApiProperty()
  canteenId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  latitude: number
  @ApiProperty()
  longitude: number
}
export class CreateShopResponseDto {
  @ApiProperty()
  token: string
}

export class ShopLoginResponseDto extends CreateShopResponseDto {}

export class UpdateShopInfoResponseDto {
  @ApiProperty()
  shopId: number
  @ApiProperty()
  username: string
  @ApiProperty()
  shopName: string
  @ApiProperty()
  profilePicture: string
  @ApiProperty()
  tel: string
  @ApiProperty()
  shopNumber: string
  @ApiProperty({description: 'status default is "false", mean shop is close'})
  status: string
  @ApiProperty()
  canteenId: number
}

export class GetShopInfoResponseDto extends UpdateShopInfoResponseDto {}

export class UpdateShopStatusResponseDto extends UpdateShopInfoResponseDto {}

export class CreateMenuResponseDto {
  @ApiProperty()
  menuId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  picture: string
  @ApiProperty()
  price: number
  @ApiProperty()
  description: string
  @ApiProperty({description: 'status default is "false", mean menu is not available'})
  status: boolean
  @ApiProperty()
  shopId: number
}

export class EditMenuResponseDto extends CreateMenuResponseDto {}

export class UpdateMenuStatusResponseDto extends CreateMenuResponseDto {}

export class DeleteMenuResponseDto extends CreateMenuResponseDto {}

export class GetMenuResponseDto extends CreateMenuResponseDto {}

export class OptionItem {
  @ApiProperty()
  optionItemId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
}

export class CreateOptionResponseDto {
  @ApiProperty()
  optionId: number
  @ApiProperty()
  menuId: number
  @ApiProperty()
  name: string
  @ApiProperty()
  mustChoose: boolean
  @ApiProperty()
  maxChoose: number
  @ApiProperty()
  minChoose: number
  @ApiProperty({type: [OptionItem]})
  optionItems: OptionItem
}

export class GetMenuInfoResponseDto extends CreateMenuResponseDto {
  @ApiProperty({type: [CreateOptionResponseDto]})
  option: CreateOptionResponseDto[]
}

export class EditOptionResponseDto extends CreateOptionResponseDto {}

export class DeleteOptionResponseDto extends CreateOptionResponseDto {}

export class GetOptionResponseDto extends CreateOptionResponseDto {}

export class GetOptionInfoResponseDto extends CreateOptionResponseDto {}

export class SearchShopResponseDto {
  @ApiProperty()
  shopId: number
  @ApiProperty()
  shopname: string
  @ApiProperty({description: 'encoded in base64'})
  profilePicture: string
  @ApiProperty({description: 'true is open, false is close'})
  status: Boolean
}

export class Requester {
  @ApiProperty()
  username: string
  @ApiProperty()
  profilePicture: string
}

export class GetShopReviewResponseDto {
  @ApiProperty()
  rating: number
  @ApiProperty()
  comment: string
  @ApiProperty({ type: Requester })
  requester: Requester;
}

export class CreateSpecialOperatingHoursResponseDto {
  @ApiProperty()
  specialOperatingHoursId: number
  @ApiProperty()
  date: Date
  @ApiProperty()
  open: string
  @ApiProperty()
  close: string
  @ApiProperty()
  shopId: number
}
export class DayOfWeek {
  @ApiProperty()
  day: string
  @ApiProperty()
  open: string
  @ApiProperty()
  close: string
}

export class CreateScheduleResponseDto {
  @ApiProperty()
  scheduleId: number
  @ApiProperty({type: [DayOfWeek]})
  dayOfWeek: DayOfWeek
  @ApiProperty()
  shopId: number
}

export class GetScheduleResponseDto extends CreateScheduleResponseDto {}

export class GetSpecialOperatingHoursResponseDto extends CreateSpecialOperatingHoursResponseDto {}

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

export class OrderItem {
  @ApiProperty()
  orderItemId: number
  @ApiProperty()
  quantity: number
  @ApiProperty()
  totalPrice: number
  @ApiProperty()
  specialInstructions: string
  @ApiProperty({type: [Menu]})
  menu: Menu[]
  @ApiProperty({type: [OrderItemExtra]})
  orderItemExtras: OrderItemExtra[]
}

export class GetOrderResponseDto {
  @ApiProperty()
  orderId: number
  @ApiProperty()
  orderDate: Date
  @ApiProperty({description: '"lookingForWalker", "inProgress", "completed", "cancelled"'})
  orderStatus: string
  @ApiProperty({type: [OrderItem]})
  orderItem: OrderItem[]
}

export class GetOrderHistoryResponseDto extends GetOrderResponseDto {}

export class UpdateOrderStatusResponseDto extends GetOrderResponseDto {}