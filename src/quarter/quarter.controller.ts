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
import { QuarterService } from './quarter.service';
import { CreateQuarterDto } from './dto/quarter.create.dto';
// import { UpdateQuarterDto } from './dto/quarter.update.dto';
import { PointDto } from './dto/point.dto';
import { QuarterQueryDto } from './dto/quarter.query.dto';

@Controller('quarter')
export class QuarterController {
  constructor(private readonly quarterService: QuarterService) {}

  @Post()
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

  @Get('point')
  async findQuarterByLocation(@Body() body: PointDto) {
    return this.quarterService.findQuarterContainingPoint(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quarterService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.quarterService.remove(id);
  }
}
