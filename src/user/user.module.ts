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

@Module({
  controllers: [
    UserController,
    UserAuthController,
    UserProfileController,
    UserFollowController,
  ],
  providers: [UserService],
  imports: [
    ApiModule,
    TwilioModule,
    RefreshModule,
    FirebaseModule,
    // UserFollowController,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
