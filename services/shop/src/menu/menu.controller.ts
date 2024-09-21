import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { EditMenuDto } from './dto/edit-menu.dto';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @MessagePattern('createMenu')
  createMenu(msg: CreateMenuDto){
    return this.menuService.createMenu(msg);
  }

  @MessagePattern('editMenu')
  editMenu(msg: EditMenuDto) {
    return this.menuService.editMenu(msg);
  }

  @MessagePattern('updateMenuStatus')
  updateMenuStatus(msg: object){
    const menuId = parseInt(msg["menuId"].toString());
    return this.menuService.updateMenuStatus(menuId);
  }

  @MessagePattern('deleteMenu')
  deleteMenu(msg: object){
    const id = parseInt(msg["menuId"].toString());
    return this.menuService.deleteMenu(id);
  }

  @MessagePattern('getMenuInfo')
  getMenuInfo(msg: object){
    const id = parseInt(msg["menuId"].toString());
    return this.menuService.getMenuInfo(id);
  }

  @MessagePattern('getMenu')
  getMenu(msg: object){
    console.log(msg);
    const authId = msg["authId"].toString();
    return this.menuService.getMenu(authId);
  }
}
