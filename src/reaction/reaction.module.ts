import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ApiModule } from 'src/common/Api/api.module';
import { CommentModule } from 'src/comment/comment.module';
import { LikesModule } from 'src/likes/likes.module';
import { LikesSchema } from 'src/likes/likes.schema';
import { CommentSchema } from 'src/comment/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [ReactionService],
  providers: [ReactionService],
  imports: [
    ApiModule,
    CommentModule,
    LikesModule,
    MongooseModule.forFeature([
      { name: 'Likes', schema: LikesSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
})
export class ReactionModule {}
