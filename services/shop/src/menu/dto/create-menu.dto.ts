export class OptionItem {
  name: string
  price: number
}

export class Option {
  optionId: number
  name: string
  mustChoose: boolean
  maxChoose: number
  minChoose: number
  optionItems: OptionItem[]
}

export class CreateMenuDto {
  authId: string
  name: string
  picture: string
  price: number
  description: string
  option: Option[]
}
