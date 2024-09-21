import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketService } from './ticket.service';
import { ApiModule } from 'src/common/Api/api.module';
import { Ticket, TicketSchema } from './ticket.schema';
import { EventSchema } from 'src/event/event.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { TicketController } from './ticket.controller';
import { Admin, AdminSchema } from 'src/admin/admin.schema';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
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
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
