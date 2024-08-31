import { Body, Controller, Delete, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateMenuRequestDto, CreateShopRequestDto, SearchShopRequestDto, CreateOptionRequestDto, EditOptionRequestDto, EditMenuRequestDto } from 'src/dtos';

@Controller('shop')
export class ShopController {
  constructor(@Inject('KAFKA') private client: ClientKafka) { }

  @Post('create-shop')
  async createShop(@Body() createShopRequest: CreateShopRequestDto): Promise<string> {
      const result = await this.client.send('createShop', JSON.stringify(createShopRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Post('create-menu')
  async createMenu(@Body() createMenuRequest: CreateMenuRequestDto): Promise<string> {
      const result = await this.client.send('createMenu', JSON.stringify(createMenuRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Post('edit-menu')
  async editMenu(@Body() editMenuRequest: EditMenuRequestDto): Promise<string> {
      const result = await this.client.send('editMenu', JSON.stringify(editMenuRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Delete('delete-menu')
  async deleteMenu(@Query() menuId: object): Promise<string> {
    const result = await this.client.send('deleteMenu', JSON.stringify(menuId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu')
  async getMenu(@Query() shopId: object): Promise<string> {
    console.log(shopId);
    const result = await this.client.send('getMenu', JSON.stringify(shopId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu/info')
  async getMenus(@Query() menuId: object): Promise<string> {
    const result = await this.client.send('getMenuInfo', JSON.stringify(menuId));
    const value = await lastValueFrom(result);
    return value;
  }
  
  @Post('menu/create-option')
  async createOption(@Body() createOptionRequest: CreateOptionRequestDto): Promise<string> {
      const result = await this.client.send('createOption', JSON.stringify(createOptionRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Post('menu/edit-option')
  async editOption(@Body() editOptionRequest: EditOptionRequestDto): Promise<string> {
      const result = await this.client.send('editOption', JSON.stringify(editOptionRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Delete('menu/delete-option')
  async deleteOption(@Query() optionId: object): Promise<string> {
    const result = await this.client.send('deleteOption', JSON.stringify(optionId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu/option')
  async getOption(@Query() menuId: object): Promise<string> {
    const result = await this.client.send('getOption', JSON.stringify(menuId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu/option/info')
  async getOptions(@Query() optionId: object): Promise<string> {
    const result = await this.client.send('getOptionInfo', JSON.stringify(optionId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('search')
  async searchShop(@Query() searchShopRequest: SearchShopRequestDto): Promise<string> {
    searchShopRequest.canteenId = parseInt(searchShopRequest.canteenId.toString());
    const result = await this.client.send('searchShop', JSON.stringify(searchShopRequest));
    const value = await lastValueFrom(result);
    return value;
  }
  
  @Get('review')
  async shopReview(@Query() shopId: object): Promise<string> {
    const result = await this.client.send('shopReview', JSON.stringify(shopId));
    const value = await lastValueFrom(result);
    return value;
  }
}
