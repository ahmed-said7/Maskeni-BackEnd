import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Group } from 'src/group/group.schema';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true, trim: true })
  content: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Group.name })
  group: Types.ObjectId;

  @Prop([
    {
      _id: Types.ObjectId,
      user: { type: Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: new Date() },
    },
  ])
  likes: { user: Types.ObjectId; createdAt: Date; _id: Types.ObjectId }[];

  @Prop({
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() },
  })
  saved: { user: Types.ObjectId; createdAt?: Date; _id: Types.ObjectId }[];

  @Prop([
    {
      _id: Types.ObjectId,
      user: { type: Types.ObjectId, ref: 'User' },
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
  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;
  @Prop({ type: Boolean, default: false })
  isArchived: boolean;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
