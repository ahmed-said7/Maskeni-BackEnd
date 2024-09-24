import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FaxService } from './fax.service';
import { CreateFaxDto } from './dto/create.fax.dto';
import { FindQuery } from 'src/common/types';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { UpdateFaxDto } from './dto/update.fax.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Fax')
@Controller('fax')
export class FaxController {
  constructor(private faxService: FaxService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Create a new fax' })
  @ApiResponse({ status: 201, description: 'Fax created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createContact(@Body() body: CreateFaxDto) {
    return this.faxService.createFax(body);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get all faxes' })
  @ApiResponse({ status: 200, description: 'List of all faxes.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllContact(@Query() query: FindQuery) {
    return this.faxService.getAllFaxs(query);
  }

  @Delete(':faxId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Delete a fax by ID' })
  @ApiResponse({ status: 200, description: 'Fax deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Fax not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteQuestion(@Param('faxId', ValidateObjectIdPipe) faxId: string) {
    return this.faxService.deleteFax(faxId);
  }

  @Patch(':faxId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Update a fax by ID' })
  @ApiResponse({ status: 200, description: 'Fax updated successfully.' })
  @ApiResponse({ status: 404, description: 'Fax not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateQuestion(
    @Param('faxId', ValidateObjectIdPipe) faxId: string,
    @Body() body: UpdateFaxDto,
  ) {
    return this.faxService.updateFax(body, faxId);
  }
}
