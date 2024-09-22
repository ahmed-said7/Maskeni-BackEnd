import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { MessagingGateway } from './socket-gateway.service';
import { GatewayMap } from './session-gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { AdminSchema } from 'src/admin/admin.schema';
import {
  CustomerServiceChat,
  CustomerServiceChatSchema,
} from 'src/customer-service-chat/customer-service-chat.schema';
import {
  CustomerServiceMessage,
  CustomerServiceMessageSchema,
} from 'src/customer-service-message/customer-service-message.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Admin', schema: AdminSchema },
      { name: CustomerServiceChat.name, schema: CustomerServiceChatSchema },
      {
        name: CustomerServiceMessage.name,
        schema: CustomerServiceMessageSchema,
      },
    ]),
  ],
  providers: [MessagingGateway, GatewayMap],
  exports: [],
  controllers: [],
})
export class GatewayModule {}
