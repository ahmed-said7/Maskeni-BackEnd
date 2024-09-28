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
import { FindQuery } from 'src/common/types';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create.country.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Country') // Tag for grouping related endpoints in Swagger
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({ status: 201, description: 'Country created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() body: CreateCountryDto) {
    return this.countryService.create(body);
  }

  // @Get('all')
  // @ApiOperation({ summary: 'Get all countries' })
  // @ApiResponse({ status: 200, description: 'List of all countries.' })
  // async findAll() {
  //   return this.countryService.findAll();
  // }

  @Get()
  @ApiOperation({ summary: 'Get countries with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of countries with pagination.',
  })
  async find(@Query() query: FindQuery) {
    return this.countryService.getAllCountries(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiResponse({ status: 200, description: 'Country found.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  async findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Delete a country by ID' })
  @ApiResponse({ status: 200, description: 'Country deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
