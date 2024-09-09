import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class OrderItemExtra {
  @ApiProperty()
  @IsNumber()
  optionItemId: number;
  @ApiProperty()
  @IsBoolean()
  selected: boolean;
}

export class OrderItem {
  @ApiProperty()
  @IsNumber()
  shopId: number;
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsNumber()
  totalPrice: number;
  @ApiPropertyOptional()
  @IsString()
  specialInstructions?: string;
  @ApiProperty()
  @IsNumber()
  menuId: number;
  @ApiProperty({type: [OrderItemExtra]})
  orderItemExtras: OrderItemExtra[];
}

export class CreateOrderRequestDto {
  @ApiProperty()
  @IsString()
  authId: string;
  @ApiProperty()
  @IsNumber()
  canteenId: number;
  @ApiProperty()
  @IsNumber()
  addressId: number;
  @ApiProperty({ type: [OrderItem] })
  orderItems: OrderItem[];
  @ApiProperty()
  @IsNumber()
  totalPrice: number;
  @ApiProperty()
  @IsNumber()
  shippingFee: number;
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsDate()
  orderDate: Date;
  @ApiProperty()
  @IsString()
  transactionType: string;
  @ApiProperty()
  @IsDate()
  transactionDate: Date;
}
