import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { Event, EventSchema } from './event.schema';
import { Ticket, TicketSchema } from 'src/ticket/ticket.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ReactionModule } from 'src/reaction/reaction.module';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { CommentSchema } from 'src/comment/comment.schema';
import { LikesSchema } from 'src/likes/likes.schema';
import { SearchQuery } from 'src/share/feed.module';

@Module({
  imports: [
    ApiModule,
    ReactionModule,
    MongooseModule.forFeature([
      { name: 'Likes', schema: LikesSchema },
      { name: 'Comment', schema: CommentSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Event.name,
        useFactory: async () => {
          const schema = EventSchema;
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
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
