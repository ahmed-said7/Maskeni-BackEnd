import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionModule } from 'src/reaction/reaction.module';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { OfferedService } from './offered-service.service';
import { OfferedController } from './offered-service.controller';
import { Offered, OfferedSchema } from './offered-service.schema';
import { SearchQuery } from 'src/share/share.module';

@Module({
  imports: [
    ReactionModule,
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
        name: Offered.name,
        useFactory: async () => {
          const schema = OfferedSchema;
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
  providers: [OfferedService],
  controllers: [OfferedController],
})
export class ServiceModule {}
