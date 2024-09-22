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

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createQuestion(@Body() body: CreateQuestionDto, @Req() req: any) {
    return this.questionService.createQuestion(body, req.userId);
  }
  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllQuestion(@Query() query: QueryQuestionDto) {
    return this.questionService.getAllQuestion(query);
  }
  @Patch(':questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
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
  deleteQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.deleteQuestion(questionId, req.userId);
  }
  @Post('comment/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
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
  getQuestionComment(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: FindQuery,
  ) {
    return this.questionService.getComments(questionId, query);
  }
  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteQuestionComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.questionService.removeComment(commentId, req.userId);
  }
  @Post('likes/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addQuestionLike(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.addLike(questionId, req.userId);
  }
  @Delete('likes/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeQuestionLike(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.removeLike(questionId, req.userId);
  }
  @Get('likes/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getQuestionLikes(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: FindQuery,
  ) {
    return this.questionService.getLikes(questionId, query);
  }
  @Post('saved/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.addSaved(questionId, req.userId);
  }
  @Delete('saved/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.deleteSaved(questionId, req.userId);
  }
  @Get('saved/:questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: QueryQuestionDto,
  ) {
    return this.questionService.getAllSaved(questionId, query);
  }
  @Get(':questionId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getQuestion(@Param('questionId', ValidateObjectIdPipe) questionId: string) {
    return this.questionService.getQuestion(questionId);
  }
}
