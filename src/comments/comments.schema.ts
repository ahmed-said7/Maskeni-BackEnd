import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: String })
  content: string;
  @Prop({ ref: User.name, type: Types.ObjectId })
  user: Types.ObjectId;
  @Prop({ type: String })
  post: string;
}
export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
