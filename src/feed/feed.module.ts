import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { Event, EventSchema } from 'src/event/event.schema';
import { Offered, OfferedSchema } from 'src/service/offered-service.schema';
import { Voluntary, VoluntarySchema } from 'src/voluntary/voluntary.schema';
import { Share, ShareSchema } from 'src/share/share.schema';
import { Question, QuestionSchema } from 'src/question/question.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Offered.name, schema: OfferedSchema },
      { name: Voluntary.name, schema: VoluntarySchema },
      { name: Share.name, schema: ShareSchema },
      { name: Question.name, schema: QuestionSchema },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
