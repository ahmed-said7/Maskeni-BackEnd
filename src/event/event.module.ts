import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { EventSchema } from './event.schema';
import { Ticket, TicketSchema } from 'src/ticket/ticket.schema';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ReactionModule } from 'src/reaction/reaction.module';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { CommentSchema } from 'src/comment/comment.schema';
import { LikesSchema } from 'src/likes/likes.schema';

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
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
