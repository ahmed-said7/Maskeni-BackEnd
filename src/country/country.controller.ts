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
import { FindQuery } from 'src/common/types';
import { PointDto } from './dto/point.dto';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create.country.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
// import { UpdateCountryDto } from './dto/update.country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async create(@Body() body: CreateCountryDto) {
    return this.countryService.create(body);
  }

  @Get('all')
  async findAll() {
    return this.countryService.findAll();
  }
  @Get()
  async find(@Query() query: FindQuery) {
    return this.countryService.getAllCountries(query);
  }

  @Get('point')
  async findQuarterByLocation(@Body() body: PointDto) {
    return this.countryService.findCountryContainingPoint(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() body: UpdateCountryDto) {
  //   return this.countryService.update(id, body);
  // }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
