import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { UserAuthController } from './auth.controller';
import { ApiModule } from 'src/common/Api/api.module';
import { UserProfileController } from './profile.controller';
import { AuthModule } from 'src/refresh/auth.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  controllers: [UserController, UserAuthController, UserProfileController],
  providers: [UserService],
  imports: [
    ApiModule,
    MessagingModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
