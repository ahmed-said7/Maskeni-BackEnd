import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FaxService } from './fax.service';
import { CreateFaxDto } from './dto/create.fax.dto';
import { FindQuery } from 'src/common/types';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { UpdateFaxDto } from './dto/update.fax.dto';

@Controller('fax')
export class FaxController {
  constructor(private faxService: FaxService) {}
  @Post()
  createContact(@Body() body: CreateFaxDto) {
    return this.faxService.createFax(body);
  }
  @Get()
  getAllContact(@Query() query: FindQuery) {
    return this.faxService.getAllFaxs(query);
  }
  @Delete(':faxId')
  deleteQuestion(@Param('faxId', ValidateObjectIdPipe) faxId: string) {
    return this.faxService.deleteFax(faxId);
  }
  @Patch(':faxId')
  updateQuestion(
    @Param('faxId', ValidateObjectIdPipe) faxId: string,
    @Body() body: UpdateFaxDto,
  ) {
    return this.faxService.updateFax(body, faxId);
  }
}
