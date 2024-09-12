import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { OptionItem } from './create-option-request.dto';

export class EditOptionRequestDto{
  @ApiProperty()
  @IsNumber()
  optionId: number;
  @ApiProperty()
  @IsNumber()
  menuId: number
  @ApiPropertyOptional({description: 'name of option'})
  @IsString()
  name?: string
  @ApiPropertyOptional({description: 'true if customer can choose multiple option, false if customer can only choose one option'})
  @IsBoolean()
  mustChoose?: boolean
  @ApiPropertyOptional({description: 'maximum number of option that customer can choose'})
  @IsNumber()
  maxChoose?: number
  @ApiPropertyOptional({description: 'minimum number of option that customer must choose'})
  @IsNumber()
  minChoose?: number
  @ApiPropertyOptional({description: 'list of option items', type: [OptionItem]})
  optionItems: Array<OptionItem>
}
