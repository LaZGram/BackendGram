import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/edit-menu.dto';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @MessagePattern('createMenu')
  createMenu(msg: CreateMenuDto): string {
    return this.menuService.createMenu(msg);
  }

  @MessagePattern('editMenu')
  editMenu(msg: EditMenuDto): string {
    return this.menuService.editMenu(msg);
  }

  @MessagePattern('deleteMenu')
  deleteMenu(msg: object): string {
    const id = parseInt(msg["menuId"].toString());
    return this.menuService.deleteMenu(id);
  }

  @MessagePattern('getMenuInfo')
  getMenuInfo(msg: object): string {
    const id = parseInt(msg["menuId"].toString());
    return this.menuService.getMenuInfo(id);
  }

  @MessagePattern('getMenu')
  getMenu(msg: object): string {
    console.log(msg);
    const shopId = parseInt(msg["shopId"].toString());
    return this.menuService.getMenu(shopId);
  }
}
