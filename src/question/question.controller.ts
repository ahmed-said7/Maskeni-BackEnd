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
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { CreateCommentDto } from 'src/reaction/dto/comment.create.dto';
import { FindQuery } from 'src/common/types';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create.question.dto';
import { QueryQuestionDto } from './dto/query.question.dto';
import { UpdateQuestionDto } from './dto/update.question.dto';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  createQuestion(@Body() body: CreateQuestionDto, @Req() req: any) {
    return this.questionService.createQuestion(body, req.userId);
  }
  @Get()
  getAllQuestion(@Query() query: QueryQuestionDto) {
    return this.questionService.getAllQuestion(query);
  }
  @Patch(':questionId')
  updateQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Body() body: UpdateQuestionDto,
    @Req() req: any,
  ) {
    return this.questionService.updateQuestion(questionId, body, req.userId);
  }
  @Delete(':questionId')
  deleteQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.deleteQuestion(questionId, req.userId);
  }
  @Post(':questionId/comment')
  createQuestionComment(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.questionService.addComment(body, questionId, req.userId);
  }
  @Post(':questionId/comment')
  getQuestionComment(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: FindQuery,
  ) {
    return this.questionService.getComments(questionId, query);
  }
  @Delete(':questionId/comment/:commentId')
  deleteQuestionComment(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.questionService.removeComment(
      questionId,
      commentId,
      req.userId,
    );
  }
  @Post('likes/:questionId')
  addQuestionLike(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.addLike(questionId, req.userId);
  }
  @Delete('likes/:questionId')
  removeQuestionLike(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.removeLike(questionId, req.userId);
  }
  @Get('likes/:questionId')
  getQuestionLikes(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: FindQuery,
  ) {
    return this.questionService.getLikes(questionId, query);
  }
  @Post('saved/:questionId')
  addSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.addSaved(questionId, req.userId);
  }
  @Delete('saved/:questionId')
  removeSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Req() req: any,
  ) {
    return this.questionService.deleteSaved(questionId, req.userId);
  }
  @Get('saved/:questionId')
  getSavedQuestion(
    @Param('questionId', ValidateObjectIdPipe) questionId: string,
    @Query() query: QueryQuestionDto,
  ) {
    return this.questionService.getAllSaved(questionId, query);
  }
  @Get(':questionId')
  getQuestion(@Param('questionId', ValidateObjectIdPipe) questionId: string) {
    return this.questionService.getQuestion(questionId);
  }
}
