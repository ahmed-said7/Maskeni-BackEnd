import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { ApiModule } from 'src/common/Api/api.module';
import {
  CustomerServiceChat,
  CustomerServiceChatSchema,
} from './customer-service-chat.schema';
import { CustomerServiceChatController } from './customer-service-chat.controller';
import { CustomerServiceChatService } from './customer-service-chat.service';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { CustomerServiceMessageModule } from 'src/customer-service-message/customer-service-message.module';

@Module({
  imports: [
    CustomerServiceMessageModule,
    ApiModule,
    MongooseModule.forFeature([
      {
        name: CustomerServiceChat.name,
        schema: CustomerServiceChatSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [CustomerServiceChatController],
  providers: [CustomerServiceChatService],
  exports: [CustomerServiceChatService],
})
export class CustomerServiceChatModule {}
