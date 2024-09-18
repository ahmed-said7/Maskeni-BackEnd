import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Group } from 'src/group/group.schema';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true, trim: true })
  content: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Group.name })
  group: Types.ObjectId;

  @Prop([
    {
      _id: Types.ObjectId,
      user: { type: Types.ObjectId, ref: User.name },
      createdAt: { type: Date, default: new Date() },
    },
  ])
  likes: { user: Types.ObjectId; createdAt: Date; _id: Types.ObjectId }[];

  @Prop({
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: User.name },
    createdAt: { type: Date, default: new Date() },
  })
  saved: { user: Types.ObjectId; createdAt?: Date; _id: Types.ObjectId }[];

  @Prop([
    {
      _id: Types.ObjectId,
      user: { type: Types.ObjectId, ref: User.name },
      content: { type: String },
      createdAt: { type: Date, default: new Date() },
    },
  ])
  comments: {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];

  @Prop({ type: Number, default: 0 })
  likeCount: number;

  @Prop({ type: Number, default: 0 })
  commentCount: number;

  @Prop({ type: Number, default: 0 })
  savedCount: number;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
