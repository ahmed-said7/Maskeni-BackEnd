import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { ReactionModule } from 'src/reaction/reaction.module';
import { Share, ShareSchema } from './share.schema';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';

@Module({
  imports: [
    ApiModule,
    ReactionModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Share.name,
        schema: ShareSchema,
      },
    ]),
  ],
  providers: [ShareService],
  controllers: [ShareController],
})
export class ShareModule {}
