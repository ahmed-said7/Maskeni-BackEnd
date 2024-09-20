import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { Likes, LikesSchema } from './likes.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { CommentSchema } from 'src/comment/comment.schema';
@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      { name: Likes.name, schema: LikesSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
