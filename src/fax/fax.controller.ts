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

@Controller('fax')
export class FaxController {
  constructor(private faxService: FaxService) {}
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  createContact(@Body() body: CreateFaxDto) {
    return this.faxService.createFax(body);
  }
  @Get()
  @UseGuards(AuthenticationGuard)
  // @Roles(All_Role.SuperAdmin, All_Role.Admin)
  getAllContact(@Query() query: FindQuery) {
    return this.faxService.getAllFaxs(query);
  }
  @Delete(':faxId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  deleteQuestion(@Param('faxId', ValidateObjectIdPipe) faxId: string) {
    return this.faxService.deleteFax(faxId);
  }
  @Patch(':faxId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  updateQuestion(
    @Param('faxId', ValidateObjectIdPipe) faxId: string,
    @Body() body: UpdateFaxDto,
  ) {
    return this.faxService.updateFax(body, faxId);
  }
}
