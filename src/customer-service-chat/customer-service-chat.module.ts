import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ApiModule } from 'src/common/Api/api.module';
import {
  CustomerServiceChat,
  CustomerServiceChatSchema,
} from './customer-service-chat.schema';
import { CustomerServiceChatController } from './customer-service-chat.controller';
import { CustomerServiceChatService } from './customer-service-chat.service';
import { Admin, AdminSchema } from 'src/admin/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerServiceChat.name,
        schema: CustomerServiceChatSchema,
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
  controllers: [CustomerServiceChatController],
  providers: [CustomerServiceChatService],
})
export class ChatModule {}
