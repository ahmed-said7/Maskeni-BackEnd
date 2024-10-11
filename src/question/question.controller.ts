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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create.question.dto';
import { QueryQuestionDto } from './dto/query.question.dto';
import { UpdateQuestionDto } from './dto/update.question.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { AllMethods } from 'supertest/types';

@ApiTags('Questions')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get deleted questions of the user' })
  @ApiResponse({ status: 200, description: 'List of deleted questions.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getMyDeletedQuestion(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.questionService.getMyDeletedQuestion(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get archived questions of the user' })
  @ApiResponse({ status: 200, description: 'List of archived questions.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getMyArchivedQuestion(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.questionService.getMyArchivedQuestion(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({
    status: 201,
    description: 'The question has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  createQuestion(@Body() body: CreateQuestionDto, @Req() req: any) {
    return this.questionService.createQuestion(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'List of all questions.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getAllQuestion(@Query() query: QueryQuestionDto, @Req() req: any) {
    return this.questionService.getAllQuestion(query, req.userId);
  }

  @Patch(':questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  updateQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Body() body: UpdateQuestionDto,
    @Req() req: any,
  ) {
    return this.questionService.updateQuestion(questionId, body, req.userId);
  }

  @Delete(':questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  deleteQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.deleteQuestion(questionId, req.userId);
  }

  @Post('comment/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a comment to a question' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully added.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  createQuestionComment(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.questionService.addComment(body, questionId, req.userId);
  }

  @Get('comment/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get comments of a question' })
  @ApiResponse({
    status: 200,
    description: 'List of comments for the question.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getQuestionComment(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: FindQuery,
  ) {
    return this.questionService.getComments(questionId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteQuestionComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.questionService.removeComment(commentId, req.userId);
  }

  @Post('likes/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Like a question' })
  @ApiResponse({
    status: 200,
    description: 'The question has been successfully liked.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  addQuestionLike(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.addLike(questionId, req.userId);
  }

  @Delete('likes/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove like from a question' })
  @ApiResponse({
    status: 200,
    description: 'The like has been removed from the question.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  removeQuestionLike(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.removeLike(questionId, req.userId);
  }

  @Get('likes/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get likes for a question' })
  @ApiResponse({ status: 200, description: 'List of likes for the question.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getQuestionLikes(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: FindQuery,
  ) {
    return this.questionService.getLikes(questionId, query);
  }

  @Post('saved/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Save a question' })
  @ApiResponse({ status: 200, description: 'The question has been saved.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  addSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.addSaved(questionId, req.userId);
  }

  @Delete('saved/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a saved question' })
  @ApiResponse({
    status: 200,
    description: 'The saved question has been removed.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  removeSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.deleteSaved(questionId, req.userId);
  }

  @Get('saved/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get saved questions' })
  @ApiResponse({ status: 200, description: 'List of saved questions.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: QueryQuestionDto,
  ) {
    return this.questionService.getAllSaved(questionId, query);
  }

  @Get(':questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({ status: 200, description: 'The question details.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  getQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.getQuestion(questionId, req.userId);
  }
}
