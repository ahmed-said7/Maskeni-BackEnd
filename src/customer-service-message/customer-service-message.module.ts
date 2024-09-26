import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { CustomerServiceMessageService } from './customer-service-message.service';
import { CustomerServiceMessageController } from './customer-service-message.controller';
import {
  CustomerServiceChat,
  CustomerServiceChatSchema,
} from 'src/customer-service-chat/customer-service-chat.schema';
import {
  CustomerServiceMessage,
  CustomerServiceMessageSchema,
} from './customer-service-message.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerServiceChat.name,
        schema: CustomerServiceChatSchema,
      },
      {
        name: CustomerServiceMessage.name,
        schema: CustomerServiceMessageSchema,
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
  controllers: [CustomerServiceMessageController],
  providers: [CustomerServiceMessageService],
  exports: [CustomerServiceMessageService],
})
export class CustomerServiceMessageModule {}
