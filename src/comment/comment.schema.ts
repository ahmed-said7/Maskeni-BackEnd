import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Likes } from 'src/likes/likes.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  image: string;

  @Prop({ ref: 'User', type: Types.ObjectId })
  user: Types.ObjectId;

  @Prop({ ref: Comment.name, type: Types.ObjectId })
  parentComment: Types.ObjectId;

  @Prop({ type: String })
  post: string;

  @Prop({ type: [Types.ObjectId], ref: Comment.name, default: [] })
  replies: Types.ObjectId[]; // References to Comment

  @Prop({ type: [Types.ObjectId], ref: Likes.name, default: [] })
  likes: Types.ObjectId[]; // References to Comment

  @Prop({ type: Number, default: 0 })
  repliesCount: number;

  @Prop({ type: Number, default: 0 })
  likesCount: number;
}
export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
