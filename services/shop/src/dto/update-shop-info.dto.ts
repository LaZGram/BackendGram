import { PartialType } from '@nestjs/mapped-types';
import { CreateShopDto } from './create-shop.dto';

export class UpdateShopInfoDto extends PartialType(CreateShopDto) {}
