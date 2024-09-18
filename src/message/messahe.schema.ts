import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Chat } from 'src/chat/chat.schema';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: String, trim: true })
  content: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Types.ObjectId, ref: Chat.name })
  chat: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  seen?: boolean;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);
