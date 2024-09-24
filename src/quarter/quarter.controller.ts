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
import { QuarterService } from './quarter.service';
import { CreateQuarterDto } from './dto/quarter.create.dto';
// import { UpdateQuarterDto } from './dto/quarter.update.dto';
// import { PointDto } from './dto/point.dto';
import { QuarterQueryDto } from './dto/quarter.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('quarter')
export class QuarterController {
  constructor(private readonly quarterService: QuarterService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async create(@Body() body: CreateQuarterDto) {
    return this.quarterService.create(body);
  }

  @Get('all')
  async findAll() {
    return this.quarterService.findAll();
  }
  @Get()
  async find(@Query() query: QuarterQueryDto) {
    return this.quarterService.getAllQuarters(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quarterService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  async remove(@Param('id') id: string) {
    return this.quarterService.remove(id);
  }

  @Get('point/:location')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getLocation(@Param('location') location: string) {
    const [lat, lng] = location.split(':');
    return this.quarterService.findQuarterContainingPoint([
      parseInt(lng),
      parseInt(lat),
    ]);
  }
}
