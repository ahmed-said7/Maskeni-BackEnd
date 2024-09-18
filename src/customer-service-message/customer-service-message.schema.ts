import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CustomerServiceChat } from 'src/customer-service-chat/customer-service-chat.schema';

@Schema({ timestamps: true })
export class CustomerServiceMessage {
  @Prop({ type: String, trim: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: CustomerServiceChat.name })
  chat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, refPath: 'type' })
  user: Types.ObjectId;

  @Prop({ type: String })
  type: string;
}

export type CustomerServiceMessageDocument =
  HydratedDocument<CustomerServiceMessage>;
export const CustomerServiceMessageSchema = SchemaFactory.createForClass(
  CustomerServiceMessage,
);
