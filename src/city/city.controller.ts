import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/city.create.dto';
import { CityQueryDto } from './dto/city.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('City') // Tag for grouping city-related endpoints in Swagger
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Create a new city' }) // Operation summary for Swagger
  @ApiResponse({ status: 201, description: 'City created successfully.' }) // Successful response
  @ApiResponse({ status: 403, description: 'Forbidden.' }) // Forbidden response
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  // @Get('all')
  // @ApiOperation({ summary: 'Get all cities' }) // Operation summary for Swagger
  // @ApiResponse({ status: 200, description: 'List of cities.' }) // Successful response
  // async findAll(@Query('country') country: string) {
  //   return this.cityService.findAll({ country });
  // }

  @Get()
  @ApiOperation({ summary: 'Get cities with query filters' }) // Operation summary for Swagger
  @ApiResponse({ status: 200, description: 'List of filtered cities.' }) // Successful response
  async find(@Query() query: CityQueryDto) {
    return this.cityService.getAllCities(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city by ID' }) // Operation summary for Swagger
  @ApiResponse({ status: 200, description: 'City found.' }) // Successful response
  @ApiResponse({ status: 404, description: 'City not found.' }) // Not found response
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Delete a city by ID' }) // Operation summary for Swagger
  @ApiResponse({ status: 200, description: 'City deleted successfully.' }) // Successful response
  @ApiResponse({ status: 404, description: 'City not found.' }) // Not found response
  async remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}
