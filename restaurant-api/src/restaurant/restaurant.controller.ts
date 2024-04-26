import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { MyValidation } from '../common/validation.pipe';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSupportedCities, Restaurant, RestaurantResponse } from './restaurant.entity';

@ApiTags('Restaurant')
@Controller('v1/restaurants')
export class RestaurantV1Controller {

  constructor(private readonly restaurantService: RestaurantService, private readonly myValidation: MyValidation) { }

  @ApiOperation({ summary: 'Add new restaurant' })
  @ApiResponse({ status: 201, description: 'Successful operation', type: Restaurant })
  @Post()
  @ApiBody({
    required: true,
    type: Restaurant
  })
  addRestaurant(
    @Body() completeBody: { name: string, address: string, city: string, longitude: number, latitude: number }): Restaurant {
    this.myValidation.validateCreate(completeBody);
    return this.restaurantService.addRestaurants(completeBody.name, completeBody.address, completeBody.city, completeBody.longitude, completeBody.latitude);
  }

  @ApiOperation({ summary: 'Get restaurant by user location and distance' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: [Restaurant] })
  @Get()
  getRestaurantsByLocation(@Query('city') city: string, @Query('longitude') longitude: number, @Query('latitude') latitude: number, @Query('distance') distance: number) {
    this.myValidation.validateGet(city, longitude, latitude, distance);
    return this.restaurantService.getRestaurantsByLocation(latitude, longitude, distance, city)
  }

  @ApiOperation({ summary: 'Get Single Restaurant By Id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Restaurant })
  @Get(':id')
  getRestaurant(@Param('id') restId: number) {
    this.myValidation.validateId(+restId);
    return this.restaurantService.getSingleRestaurant(+restId);
  }

  @ApiOperation({ summary: 'Update Restaurant By Id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: Restaurant })
  @Put(':id')
  @ApiBody({
    required: true,
    type: Restaurant
  })
  updateRestaurant(
    @Param('id') restId: number,
    @Body() completeBody: { name: string, address: string, city: string, longitude: number, latitude: number }
  ) {
    this.myValidation.validateId(+restId);
    return this.restaurantService.updateRestaurant(+restId, completeBody.name, completeBody.address, completeBody.city, completeBody.latitude, completeBody.longitude);
  }

  @ApiOperation({ summary: 'Delete Restaurant By Id' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: RestaurantResponse })
  @Delete(':id')
  removeRestaurant(@Param('id') restId: number) {
    this.myValidation.validateId(+restId);
    this.restaurantService.deleteRestaurant(+restId);
    return { response: 'restaurant deleted' };
  }

  @ApiOperation({ summary: 'Add supported cities' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: RestaurantResponse })
  @Post('supported-cities')
  @ApiBody({
    required: true,
    type: CreateSupportedCities
  })
  addSupportedCities(
    @Body('name') name: string
  ) {
    this.myValidation.validateName(name);
    this.restaurantService.addSupportedCity(name);
    return { response: 'created successfully' }
  }
}

