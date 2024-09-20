import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';


export class EditOptionItem {
  @ApiPropertyOptional({description: 'name of option item'})
  @IsString()
  name: string
  @ApiPropertyOptional({description: 'price of option item'})
  @IsNumber()
  price: number
}

export class EditOption {
  @ApiPropertyOptional({description: 'id of option'})
  @IsNumber()
  optionId: number
  @ApiPropertyOptional({description: 'name of option'})
  @IsString()
  name: string
  @ApiPropertyOptional({description: 'true if customer can choose multiple option, false if customer can only choose one option'})
  @IsBoolean()
  mustChoose: boolean
  @ApiPropertyOptional({description: 'maximum number of option that customer can choose'})
  @IsNumber()
  maxChoose: number
  @ApiPropertyOptional({description: 'minimum number of option that customer must choose'})
  @IsNumber()
  minChoose: number
  @ApiPropertyOptional({description: 'list of option items', type: [EditOptionItem]})
  optionItems: EditOptionItem[]
}

export class EditMenuRequestDto{
  @ApiProperty()
  @IsNumber()
  menuId: number;
  @ApiPropertyOptional()
  @IsString()
  name?: string
  @ApiPropertyOptional({description: 'encoded with base64'})
  @IsString()
  picture?: string
  @ApiPropertyOptional()
  @IsNumber()
  price?: number
  @ApiPropertyOptional()
  @IsString()
  description?: string
  @ApiPropertyOptional()
  @IsString()
  status?: boolean
  @ApiPropertyOptional({type: [EditOption]})
  option: EditOption[]
}