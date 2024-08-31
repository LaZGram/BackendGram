export class OptionItem {
  name: string
  price: number
}

export class CreateOptionRequestDto {
  menuId: number
  optionId: number
  name: string
  mushChoose: boolean
  maxChoose: number
  minChoose: number
  optionItems: Array<OptionItem>
}