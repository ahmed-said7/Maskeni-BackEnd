import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { Chat, ChatSchema } from './chat.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    MessageModule,
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
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
    ApiModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
