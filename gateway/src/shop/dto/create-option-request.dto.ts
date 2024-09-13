import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class OptionItem {
  @ApiProperty({description: 'name of option item'})
  @IsString()
  name: string
  @ApiProperty({description: 'price of option item'})
  @IsNumber()
  price: number
}

export class CreateOptionRequestDto {
  @ApiProperty()
  @IsNumber()
  menuId: number
  @ApiProperty({description: 'name of option'})
  @IsString()
  name: string
  @ApiProperty({description: 'true if customer can choose multiple option, false if customer can only choose one option'})
  @IsBoolean()
  mustChoose: boolean
  @ApiProperty({description: 'maximum number of option that customer can choose'})
  @IsNumber()
  maxChoose: number
  @ApiProperty({description: 'minimum number of option that customer must choose'})
  @IsNumber()
  minChoose: number
  @ApiProperty({description: 'list of option items'})
  optionItems: Array<OptionItem>
}