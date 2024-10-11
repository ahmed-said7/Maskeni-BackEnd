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
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CreateOfferedDto } from './dto/create.service.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { OfferedService } from './offered-service.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Service')
@ApiBearerAuth() // Adds Bearer Auth requirement
@Controller('service')
export class OfferedController {
  constructor(private readonly offeredService: OfferedService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve deleted services' })
  @ApiOkResponse({ description: 'Successfully retrieved deleted services.' })
  @ApiQuery({ type: FindQuery, required: false })
  async getMyDeletedServices(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.offeredService.getMyDeletedServices(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve archived services' })
  @ApiOkResponse({ description: 'Successfully retrieved archived services.' })
  @ApiQuery({ type: FindQuery, required: false })
  async getMyArchivedServices(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.offeredService.getMyArchivedServices(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new service' })
  @ApiCreatedResponse({ description: 'Successfully created a service.' })
  @ApiBody({ type: CreateOfferedDto })
  createService(@Body() body: CreateOfferedDto, @Req() req: any) {
    return this.offeredService.createService(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve all services' })
  @ApiOkResponse({ description: 'Successfully retrieved all services.' })
  @ApiQuery({ type: QueryOfferedDto, required: false })
  getAllServices(@Query() query: QueryOfferedDto, @Req() req: any) {
    return this.offeredService.getAllservices(query, req.userId);
  }

  @Patch(':serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update a service by ID' })
  @ApiOkResponse({ description: 'Successfully updated the service.' })
  @ApiParam({ name: 'serviceId', required: true })
  @ApiBody({ type: UpdateOfferedDto })
  updateService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Body() body: UpdateOfferedDto,
    @Req() req: any,
  ) {
    return this.offeredService.updateService(serviceId, body, req.userId);
  }

  @Delete(':serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a service by ID' })
  @ApiOkResponse({ description: 'Successfully deleted the service.' })
  @ApiParam({ name: 'serviceId', required: true })
  deleteService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteService(serviceId, req.userId);
  }

  @Post('comment/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a comment to a service' })
  @ApiCreatedResponse({ description: 'Successfully added a comment.' })
  @ApiParam({ name: 'serviceId', required: true })
  @ApiBody({ type: CreateCommentDto })
  createServiceComment(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.offeredService.addComment(body, serviceId, req.userId);
  }

  @Get('comment/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve comments for a service' })
  @ApiOkResponse({
    description: 'Successfully retrieved comments for the service.',
  })
  @ApiParam({ name: 'serviceId', required: true })
  @ApiQuery({ type: FindQuery, required: false })
  getServiceComments(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getComments(serviceId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiOkResponse({ description: 'Successfully deleted the comment.' })
  @ApiParam({ name: 'commentId', required: true })
  deleteserviceComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.offeredService.removeComment(commentId, req.userId);
  }

  @Post('likes/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a like to a service' })
  @ApiCreatedResponse({
    description: 'Successfully added a like to the service.',
  })
  @ApiParam({ name: 'serviceId', required: true })
  addServiceLike(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addLike(serviceId, req.userId);
  }

  @Delete('likes/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a like from a service' })
  @ApiOkResponse({
    description: 'Successfully removed a like from the service.',
  })
  @ApiParam({ name: 'serviceId', required: true })
  removeServiceLike(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.removeLike(serviceId, req.userId);
  }

  @Get('likes/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve likes for a service' })
  @ApiOkResponse({
    description: 'Successfully retrieved likes for the service.',
  })
  @ApiParam({ name: 'serviceId', required: true })
  @ApiQuery({ type: FindQuery, required: false })
  getServiceLikes(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getLikes(serviceId, query);
  }

  @Post('saved/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Save a service' })
  @ApiCreatedResponse({ description: 'Successfully saved the service.' })
  @ApiParam({ name: 'serviceId', required: true })
  addSavedService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addSaved(serviceId, req.userId);
  }

  @Delete('saved/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a saved service' })
  @ApiOkResponse({ description: 'Successfully removed the saved service.' })
  @ApiParam({ name: 'serviceId', required: true })
  removeSavedService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteSaved(serviceId, req.userId);
  }

  @Get('saved/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve saved services' })
  @ApiOkResponse({ description: 'Successfully retrieved saved services.' })
  @ApiParam({ name: 'serviceId', required: true })
  @ApiQuery({ type: FindQuery, required: false })
  getSavedServices(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getAllSaved(serviceId, query);
  }

  @Get(':serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve a service by ID' })
  @ApiOkResponse({ description: 'Successfully retrieved the service.' })
  @ApiParam({ name: 'serviceId', required: true })
  getServiceById(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.getService(serviceId, req.userId);
  }

  @Post('request/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Request a service' })
  @ApiCreatedResponse({ description: 'Successfully requested the service.' })
  @ApiParam({ name: 'serviceId', required: true })
  requestService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addRequested(serviceId, req.userId);
  }

  @Delete('request/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a service request' })
  @ApiOkResponse({ description: 'Successfully removed the service request.' })
  @ApiParam({ name: 'serviceId', required: true })
  removeRequestService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteRequested(serviceId, req.userId);
  }

  @Get('request/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve requested services' })
  @ApiOkResponse({ description: 'Successfully retrieved requested services.' })
  @ApiParam({ name: 'serviceId', required: true })
  @ApiQuery({ type: FindQuery, required: false })
  getRequestedServices(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getAllRequested(serviceId, query);
  }
}
