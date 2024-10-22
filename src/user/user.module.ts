import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { UserAuthController } from './auth.controller';
import { ApiModule } from 'src/common/Api/api.module';
import { UserProfileController } from './profile.controller';
import { RefreshModule } from 'src/refresh/refresh.module';
import { TwilioModule } from 'src/twilio/twilio.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserFollowController } from './follow.controller';
import { UserSavedController } from './saved.controller';
import { QuarterModule } from 'src/quarter/quarter.module';
import { SearchQuery } from 'src/feed/feed.module';
import { UserFavoriteController } from './favorite.controller';

@Module({
  controllers: [
    UserController,
    UserAuthController,
    UserProfileController,
    UserFollowController,
    UserSavedController,
    UserFavoriteController,
  ],
  providers: [UserService],
  imports: [
    QuarterModule,
    ApiModule,
    TwilioModule,
    RefreshModule,
    FirebaseModule,
    // UserFollowController,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UserSchema;
          schema.pre<SearchQuery>(/^find/, function () {
            if (!this.getOptions().skipFilter) {
              this.find({
                isDeleted: false,
              });
            }
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([
      // { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
