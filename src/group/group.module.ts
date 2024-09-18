import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupServices } from './group.service';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './group.schema';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [GroupServices],
  controllers: [GroupController],
})
export class GroupModule {}
