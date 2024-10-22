import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { ReactionModule } from 'src/reaction/reaction.module';
import { FeedController } from './feed.controller';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { Query } from 'mongoose';
import { FeedService } from './feed.service';
import { Feed, FeedSchema } from './feed.schema';
export interface SearchQuery extends Query<any, any[] | any> {
  // skipFilter?: boolean;
}

@Module({
  imports: [
    ApiModule,
    ReactionModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Feed.name,
        useFactory: async () => {
          const schema = FeedSchema;
          schema.pre<SearchQuery>(/^find/, function () {
            if (!this.getOptions().skipFilter) {
              this.find({
                isDeleted: false,
                // isAccepted: true,
                isArchived: false,
              });
            }
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
