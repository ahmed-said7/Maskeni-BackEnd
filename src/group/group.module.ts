import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupServices } from './group.service';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './group.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
// import { ApiAcceptedResponse } from '@nestjs/swagger';
import { ApiModule } from 'src/common/Api/api.module';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  providers: [GroupServices],
  controllers: [GroupController],
})
export class GroupModule {}
