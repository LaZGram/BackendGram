import { Body, Controller, Delete, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiOperation, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { CreateMenuRequestDto, CreateShopRequestDto, SearchShopRequestDto, CreateOptionRequestDto, EditOptionRequestDto, EditMenuRequestDto, CreateScheduleRequestDto, CreateSpecialOperatingHoursRequestDto } from 'src/dtos';
import { CreateMenuResponseDto, CreateOptionResponseDto, CreateScheduleResponseDto, CreateShopResponseDto, CreateSpecialOperatingHoursResponseDto, DeleteMenuResponseDto, DeleteOptionResponseDto, EditMenuResponseDto, EditOptionResponseDto, GetMenuInfoResponseDto, GetMenuResponseDto, GetOptionInfoResponseDto, GetOptionResponseDto, GetOrderHistoryResponseDto, GetOrderResponseDto, GetScheduleResponseDto, GetShopInfoResponseDto, GetShopReviewResponseDto, GetSpecialOperatingHoursResponseDto, SearchShopResponseDto, UpdateOrderStatusResponseDto, UpdateShopInfoResponseDto } from './dto/response.dto';
import { UpdateOrderStatusRequestDto } from './dto/update-order-status-request.dto';

@ApiTags('SHOP')
@Controller('shop')
export class ShopController {
  constructor(@Inject('KAFKA') private client: ClientKafka) { }

  @Post('create-shop')
  @ApiOperation({ summary: 'Create new shop to database' })
  @ApiResponse({ status: 201, description: 'Create new shop successes', type: CreateShopResponseDto })
  async createShop(@Body() createShopRequest: CreateShopRequestDto): Promise<string> {
      const result = await this.client.send('createShop', JSON.stringify(createShopRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Post('update-info')
  @ApiOperation({ summary: 'Update shop information in database' })
  @ApiResponse({ status: 201, description: 'Update shop information successes', type: UpdateShopInfoResponseDto })
  async updateShopInfo(@Body() updateShopInfoRequest: CreateShopRequestDto): Promise<string> {
      const result = await this.client.send('updateShopInfo', JSON.stringify(updateShopInfoRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Get('info')
  @ApiOperation({ summary: 'Get shop information from database' })
  @ApiQuery({ name: 'authId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Get shop information successes', type: GetShopInfoResponseDto })
  async getShopInfo(@Query() authId: object): Promise<string> {
    const result = await this.client.send('getShopInfo', JSON.stringify(authId));
    const value = await lastValueFrom(result);
    return value;
  }
  

  @Post('create-menu')
  @ApiOperation({ summary: 'Create new menu to database' })
  @ApiResponse({ status: 201, description: 'Create new menu successes', type: CreateMenuResponseDto })
  async createMenu(@Body() createMenuRequest: CreateMenuRequestDto): Promise<string> {
      const result = await this.client.send('createMenu', JSON.stringify(createMenuRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Post('edit-menu')
  @ApiOperation({ summary: 'Edit menu in database' })
  @ApiResponse({ status: 201, description: 'Edit menu successes', type: EditMenuResponseDto })
  async editMenu(@Body() editMenuRequest: EditMenuRequestDto): Promise<string> {
      const result = await this.client.send('editMenu', JSON.stringify(editMenuRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Delete('delete-menu')
  @ApiOperation({ summary: 'Delete menu in database' })
  @ApiQuery({ name: 'menuId', type: 'number' })
  @ApiResponse({ status: 201, description: 'Delete menu successes', type: DeleteMenuResponseDto })
  async deleteMenu(@Query() menuId: object): Promise<string> {
    const result = await this.client.send('deleteMenu', JSON.stringify(menuId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu')
  @ApiOperation({ summary: 'Get list of menu from database' })
  @ApiQuery({ name: 'authId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Get menu successes', type: GetMenuResponseDto, isArray: true })
  async getMenu(@Query() authId: object): Promise<string> {
    console.log(authId);
    const result = await this.client.send('getMenu', JSON.stringify(authId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu/info')
  @ApiOperation({ summary: 'Get menu information from database' })
  @ApiQuery({ name: 'menuId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Get menu information successes', type: GetMenuInfoResponseDto })
  async getMenus(@Query() menuId: object): Promise<string> {
    const result = await this.client.send('getMenuInfo', JSON.stringify(menuId));
    const value = await lastValueFrom(result);
    return value;
  }
  
  @Post('menu/create-option')
  @ApiOperation({ summary: 'Create new option to database' })
  @ApiResponse({ status: 201, description: 'Create new option successes', type: CreateOptionResponseDto })
  async createOption(@Body() createOptionRequest: CreateOptionRequestDto): Promise<string> {
      const result = await this.client.send('createOption', JSON.stringify(createOptionRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Post('menu/edit-option')
  @ApiOperation({ summary: 'Edit option in database' })
  @ApiResponse({ status: 201, description: 'Edit option successes', type: EditOptionResponseDto })
  async editOption(@Body() editOptionRequest: EditOptionRequestDto): Promise<string> {
      const result = await this.client.send('editOption', JSON.stringify(editOptionRequest));
      const value = await lastValueFrom(result);
      return value;
  }

  @Delete('menu/delete-option')
  @ApiOperation({ summary: 'Delete option in database' })
  @ApiQuery({ name: 'optionId', type: 'number' })
  @ApiResponse({ status: 201, description: 'Delete option successes', type: DeleteOptionResponseDto })
  async deleteOption(@Query() optionId: object): Promise<string> {
    const result = await this.client.send('deleteOption', JSON.stringify(optionId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu/option')
  @ApiOperation({ summary: 'Get list of option from database' })
  @ApiQuery({ name: 'menuId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Get option successes', type: GetOptionResponseDto, isArray: true })
  async getOption(@Query() menuId: object): Promise<string> {
    const result = await this.client.send('getOption', JSON.stringify(menuId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('menu/option/info')
  @ApiOperation({ summary: 'Get option information from database' })
  @ApiQuery({ name: 'optionId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Get option information successes', type: GetOptionInfoResponseDto })
  async getOptions(@Query() optionId: object): Promise<string> {
    const result = await this.client.send('getOptionInfo', JSON.stringify(optionId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('search')
  @ApiOperation({ summary: 'Search shop by name' })
  @ApiResponse({ status: 200, description: 'Search shop successes', type: SearchShopResponseDto, isArray: true })
  async searchShop(@Query() searchShopRequest: SearchShopRequestDto): Promise<string> {
    searchShopRequest.canteenId = parseInt(searchShopRequest.canteenId.toString());
    const result = await this.client.send('searchShop', JSON.stringify(searchShopRequest));
    const value = await lastValueFrom(result);
    return value;
  }
  
  @Get('review')
  @ApiOperation({ summary: 'Get list of shop review' })
  @ApiQuery({ name: 'authId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Get shop review successes', type: GetShopReviewResponseDto, isArray: true })
  async shopReview(@Query() authId: object): Promise<string> {
    const result = await this.client.send('shopReview', JSON.stringify(authId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Post('create-weekly-schedule')
  @ApiOperation({ summary: 'Create weekly schedule' })
  @ApiResponse({ status: 201, description: 'Create weekly schedule successes', type: CreateScheduleResponseDto })
  async createWeeklySchedule(@Body() createScheduleRequest: CreateScheduleRequestDto): Promise<string> {
    const result = await this.client.send('createWeeklySchedule', JSON.stringify(createScheduleRequest));
    const value = await lastValueFrom(result);
    return value;
  }

  @Post('create-special-operating-hours')
  @ApiOperation({ summary: 'Create special operating hours' })
  @ApiResponse({ status: 201, description: 'Create special operating hours successes', type: CreateSpecialOperatingHoursResponseDto })
  async createSpecialOperatingHours(@Body() createSpecialOperatingHoursRequest: CreateSpecialOperatingHoursRequestDto): Promise<string> {
    const result = await this.client.send('createSpecialOperatingHours', JSON.stringify(createSpecialOperatingHoursRequest));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('weekly-schedule')
  @ApiOperation({ summary: 'Get weekly schedule' })
  @ApiQuery({ name: 'shopId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Get weekly schedule successes', type: GetScheduleResponseDto, isArray: true })
  async getWeeklySchedule(@Query() shopId: object): Promise<string> {
    const result = await this.client.send('getWeeklySchedule', JSON.stringify(shopId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('special-operating-hours')
  @ApiOperation({ summary: 'Get special operating hours' })
  @ApiQuery({ name: 'shopId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Get special operating hours successes', type: GetSpecialOperatingHoursResponseDto, isArray: true })
  async getSpecialOperatingHours(@Query() shopId: object): Promise<string> {
    const result = await this.client.send('getSpecialOperatingHours', JSON.stringify(shopId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order')
  @ApiOperation({ summary: 'Get list of order' })
  @ApiQuery({ name: 'authId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Get order successes', type: GetOrderResponseDto, isArray: true })
  async getOrder(@Query() authId: object): Promise<string> {
    const result = await this.client.send('getShopOrder', JSON.stringify(authId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Get('order/history')
  @ApiOperation({ summary: 'Get list of order history' })
  @ApiQuery({ name: 'authId', type: 'string' })
  @ApiResponse({ status: 200, description: 'Get order history successes', type: GetOrderHistoryResponseDto, isArray: true })
  async getOrderHistory(@Query() authId: object): Promise<string> {
    const result = await this.client.send('getShopOrderHistory', JSON.stringify(authId));
    const value = await lastValueFrom(result);
    return value;
  }

  @Post('order/update-status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({ status: 201, description: 'Update order status successes', type: UpdateOrderStatusResponseDto })
  async updateOrderStatus(@Body() updateOrderStatus: UpdateOrderStatusRequestDto): Promise<string> {
    const result = await this.client.send('updateShopOrderStatus', JSON.stringify(updateOrderStatus));
    const value = await lastValueFrom(result);
    return value;
  }
}
