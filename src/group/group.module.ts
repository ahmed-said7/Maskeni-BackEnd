import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupServices } from './group.service';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './group.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
// import { ApiAcceptedResponse } from '@nestjs/swagger';
import { ApiModule } from 'src/common/Api/api.module';
import { SearchQuery } from 'src/share/share.module';

@Module({
  imports: [
    ApiModule,
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
        name: Group.name,
        useFactory: async () => {
          const schema = GroupSchema;
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
  providers: [GroupServices],
  controllers: [GroupController],
})
export class GroupModule {}
