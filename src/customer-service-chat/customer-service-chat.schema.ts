import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from 'src/message/messahe.schema';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class CustomerServiceChat {
  @Prop({ type: Boolean, default: false })
  isBusy: boolean;

  @Prop({ type: Types.ObjectId, ref: Message.name })
  lastMessage: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  customer_service: Types.ObjectId;
}

export type CustomerServiceChatDocument = HydratedDocument<CustomerServiceChat>;
export const CustomerServiceChatSchema =
  SchemaFactory.createForClass(CustomerServiceChat);
