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
import { QuarterService } from './quarter.service';
import { CreateQuarterDto } from './dto/quarter.create.dto';
import { QuarterQueryDto } from './dto/quarter.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('quarters') // Tag for grouping in Swagger UI
@Controller('quarter')
export class QuarterController {
  constructor(private readonly quarterService: QuarterService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Create a new quarter' })
  @ApiResponse({ status: 201, description: 'Quarter created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() body: CreateQuarterDto) {
    return this.quarterService.create(body);
  }

  // @Get('all')
  // @ApiOperation({ summary: 'Retrieve all quarters' })
  // @ApiResponse({ status: 200, description: 'List of all quarters.' })
  // async findAll(@Query('city') city: string) {
  //   return this.quarterService.findAll({ city });
  // }

  @Get()
  @ApiOperation({ summary: 'Find quarters with optional query parameters' })
  @ApiResponse({ status: 200, description: 'List of quarters matching query.' })
  async find(@Query() query: QuarterQueryDto) {
    return this.quarterService.getAllQuarters(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific quarter by ID' })
  @ApiResponse({ status: 200, description: 'Quarter details.' })
  @ApiResponse({ status: 404, description: 'Quarter not found.' })
  async findOne(@Param('id') id: string) {
    return this.quarterService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Delete a specific quarter by ID' })
  @ApiResponse({ status: 204, description: 'Quarter deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Quarter not found.' })
  async remove(@Param('id') id: string) {
    return this.quarterService.remove(id);
  }

  @Get('point/:location')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({
    summary: 'Find quarters containing a specific geographical point',
  })
  @ApiResponse({ status: 200, description: 'Quarter(s) containing the point.' })
  @ApiResponse({ status: 400, description: 'Invalid location format.' })
  async getLocation(@Param('location') location: string) {
    const [lat, lng] = location.split(':');
    return this.quarterService.findQuarterContainingPoint([
      parseFloat(lng),
      parseFloat(lat),
    ]);
  }
}
