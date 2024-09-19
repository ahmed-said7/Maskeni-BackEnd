import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { ReactionModule } from 'src/reaction/reaction.module';
import { VoluntaryService } from './voluntary.service';
import { VoluntaryController } from './voluntary.controller';
import { Voluntary, VoluntarySchema } from './voluntary.schema';

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
        name: Voluntary.name,
        schema: VoluntarySchema,
      },
    ]),
  ],
  providers: [VoluntaryService],
  controllers: [VoluntaryController],
})
export class VoluntaryModule {}
