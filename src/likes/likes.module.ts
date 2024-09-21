import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { LikesSchema } from './likes.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { CommentSchema } from 'src/comment/comment.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { UserSchema } from 'src/user/user.schema';
import { LikesController } from './likes.controller';
@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      { name: 'Likes', schema: LikesSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'User', schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  providers: [LikesService],
  exports: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
