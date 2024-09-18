import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ReactionModule } from 'src/reaction/reaction.module';
import { ApiModule } from 'src/common/Api/api.module';
import { PostSchema, Post } from './post.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Group, GroupSchema } from 'src/group/group.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Group.name,
        schema: GroupSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  providers: [PostService, ReactionModule, ApiModule],
  controllers: [PostController],
})
export class PostModule {}
