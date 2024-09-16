import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { AuthController } from './refresh.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
