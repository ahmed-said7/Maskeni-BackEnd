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
import { QueryGroupDto } from './dto/query.group.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('groups') // Grouping related endpoints
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupServices) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get deleted groups for the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved deleted groups.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getMyDeletedGroups(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.groupService.getMyDeletedGroups(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get archived groups for the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved archived groups.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getMyArchivedGroups(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.groupService.getMyArchivedGroups(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({ status: 201, description: 'Group created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  createGroup(@Body() body: CreateGroupDto, @Req() req: any) {
    return this.groupService.createGroup(body, req);
  }

  @Get('member/:groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get members of a specific group' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved group members.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  getGroupMembers(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.getGroupMembers(groupId, req);
  }

  @Get('all')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all groups.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getGroups(@Query() query: QueryGroupDto) {
    return this.groupService.getAllGroups(query);
  }

  @Get('my')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get groups belonging to the user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user groups.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getUserGroups(@Req() req: any, @Query() query: QueryGroupDto) {
    return this.groupService.getUserGroups(query, req);
  }

  @Patch('leave/:groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Leave a group' })
  @ApiResponse({ status: 200, description: 'Successfully left the group.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  leaveGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.leaveGroup(groupId, req.userId);
  }

  @Patch('join/:groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Join a group' })
  @ApiResponse({ status: 200, description: 'Successfully joined the group.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  joinGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.joinGroup(groupId, req.userId);
  }

  @Delete(':groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a group' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the group.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  deleteGroup(
    @Req() req: any,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.deleteGroup(groupId, req);
  }

  @Patch(':groupId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update group information' })
  @ApiResponse({ status: 200, description: 'Successfully updated the group.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  updateGroup(
    @Req() req: any,
    @Body() body: UpdateGroupDto,
    @Param('groupId', ValidateObjectIdPipe) groupId: string,
  ) {
    return this.groupService.updateGroup(body, groupId, req);
  }
}
