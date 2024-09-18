import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { GroupServices } from './group.service';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupServices) {}
  @Post()
  createGroup(@Body() body: CreateGroupDto, @Req() req: any) {
    return this.groupService.createGroup(body, req);
  }
  @Get('member/:groupId')
  getGroupMembers(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.getGroupMembers(groupId, req);
  }
  @Get('all')
  getGroups(@Query() query: FindQuery) {
    return this.groupService.getAllGroups(query);
  }
  @Get('my')
  getUserGroups(@Req() req: any, @Query() query: FindQuery) {
    return this.groupService.getUserGroups(query, req);
  }
  @Delete('/:groupId')
  deleteGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.deleteGroup(groupId, req);
  }
  @Patch('/:groupId')
  updateGroup(
    @Req() req: any,
    @Body() body: UpdateGroupDto,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.updateGroup(body, groupId, req);
  }
}
