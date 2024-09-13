import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class OrderItemExtra {
  @ApiProperty({ example: 0 })
  @IsNumber()
  optionItemId: number;
  @ApiProperty({ example: true })
  @IsBoolean()
  selected: boolean;
}

export class OrderItem {
  @ApiProperty({ example: 0 })
  @IsNumber()
  shopId: number;
  @ApiProperty({ example: 1 })
  @IsNumber()
  quantity: number;
  @ApiProperty({ example: 50 })
  @IsNumber()
  totalPrice: number;
  @ApiPropertyOptional({ example: "ไม่ผัก" })
  @IsString()
  specialInstructions?: string;
  @ApiProperty({ example: 0 })
  @IsNumber()
  menuId: number;
  @ApiProperty({type: [OrderItemExtra]})
  orderItemExtras: OrderItemExtra[];
}

export class CreateOrderRequestDto {
  @ApiProperty({ example: "1"})
  @IsString()
  authId: string;
  @ApiProperty({ example: 0 })
  @IsNumber()
  canteenId: number;
  @ApiProperty({ example: 0 })
  @IsNumber()
  addressId: number;
  @ApiProperty({ type: [OrderItem] })
  orderItems: OrderItem[];
  @ApiProperty({ example: 60 })
  @IsNumber()
  totalPrice: number;
  @ApiProperty({ example: 10 })
  @IsNumber()
  shippingFee: number;
  @ApiProperty({ example: 70 })
  @IsNumber()
  amount: number;
  @ApiProperty({ example: "2022-10-31T09:00:00Z" })
  @IsDate()
  orderDate: Date;
  @ApiProperty({ example: "Debit-card" })
  @IsString()
  transactionType: string;
  @ApiProperty({ example: "2022-10-31T09:00:00Z" })
  @IsDate()
  transactionDate: Date;
}
