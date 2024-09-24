import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
// import { FindQuery } from 'src/common/types';
// import { PointDto } from './dto/point.dto';
import { CreateCityDto } from './dto/city.create.dto';
import { CityQueryDto } from './dto/city.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
// import { UpdateCityDto } from './dto/city.update.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get('all')
  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async findAll() {
    return this.cityService.findAll();
  }
  @Get()
  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async find(@Query() query: CityQueryDto) {
    return this.cityService.getAllCities(query);
  }

  // @Get('point')
  // async findQuarterByLocation(@Body() body: PointDto) {
  //   return this.cityService.findCityContainingPoint(body);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() body: UpdateCityDto) {
  //   return this.cityService.update(id, body);
  // }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}
