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
  UseGuards,
} from '@nestjs/common';
import { GroupServices } from './group.service';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupServices) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createGroup(@Body() body: CreateGroupDto, @Req() req: any) {
    return this.groupService.createGroup(body, req);
  }

  @Get('member/:groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getGroupMembers(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.getGroupMembers(groupId, req);
  }

  @Get('all')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getGroups(@Query() query: FindQuery) {
    return this.groupService.getAllGroups(query);
  }

  @Get('my')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getUserGroups(@Req() req: any, @Query() query: FindQuery) {
    return this.groupService.getUserGroups(query, req);
  }

  @Patch('leave/:groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  leaveGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.leaveGroup(groupId, req.userId);
  }
  @Patch('join/:groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  joinGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.joinGroup(groupId, req.userId);
  }

  @Delete(':groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.deleteGroup(groupId, req);
  }

  @Patch(':groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateGroup(
    @Req() req: any,
    @Body() body: UpdateGroupDto,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.updateGroup(body, groupId, req);
  }
}
