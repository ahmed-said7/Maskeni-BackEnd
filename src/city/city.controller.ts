import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CityService } from './city.service';
// import { FindQuery } from 'src/common/types';
import { PointDto } from './dto/point.dto';
import { CreateCityDto } from './dto/city.create.dto';
import { CityQueryDto } from './dto/city.query.dto';
// import { UpdateCityDto } from './dto/city.update.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get('all')
  async findAll() {
    return this.cityService.findAll();
  }
  @Get()
  async find(@Query() query: CityQueryDto) {
    return this.cityService.getAllCities(query);
  }

  @Get('point')
  async findQuarterByLocation(@Body() body: PointDto) {
    return this.cityService.findCityContainingPoint(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() body: UpdateCityDto) {
  //   return this.cityService.update(id, body);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}
