import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { Chat, ChatSchema } from './chat.schema';
import { ApiModule } from 'src/common/Api/api.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ApiModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
