export class OptionItem {
  name: string
  price: number
}

export class CreateOptionDto {
  menuId: number
  name: string
  mustChoose: boolean
  maxChoose: number
  minChoose: number
  optionItems: Array<OptionItem>
}