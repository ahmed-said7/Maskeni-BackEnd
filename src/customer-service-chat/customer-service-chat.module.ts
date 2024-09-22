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

@Module({
  imports: [
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
})
export class CustomerServiceChatModule {}
