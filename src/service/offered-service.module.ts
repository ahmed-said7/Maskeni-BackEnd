import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionModule } from 'src/reaction/reaction.module';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { OfferedService } from './offered-service.service';
import { OfferedController } from './offered-service.controller';
import { Offered, OfferedSchema } from './offered-service.schema';

@Module({
  imports: [
    ReactionModule,
    ApiModule,
    MongooseModule.forFeature([
      {
        name: Offered.name,
        schema: OfferedSchema,
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
  providers: [OfferedService],
  controllers: [OfferedController],
})
export class ServiceModule {}
