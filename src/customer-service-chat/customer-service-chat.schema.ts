import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Admin } from 'src/admin/admin.schema';
import { CustomerServiceMessage } from 'src/customer-service-message/customer-service-message.schema';

@Schema({ timestamps: true })
export class CustomerServiceChat {
  @Prop({ type: Boolean, default: false })
  isBusy: boolean;

  @Prop({ type: Types.ObjectId, ref: CustomerServiceMessage.name })
  lastMessage: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Admin.name })
  customer_service: Types.ObjectId;
}

export type CustomerServiceChatDocument = HydratedDocument<CustomerServiceChat>;
export const CustomerServiceChatSchema =
  SchemaFactory.createForClass(CustomerServiceChat);
