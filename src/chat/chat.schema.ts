import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from 'src/message/messahe.schema';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  admin: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Message.name })
  lastMessage: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);
