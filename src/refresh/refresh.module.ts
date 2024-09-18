import { RefreshService } from './refresh.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { RefreshController } from './refresh.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [RefreshService],
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [RefreshService],
  controllers: [RefreshController],
})
export class RefreshModule {}
