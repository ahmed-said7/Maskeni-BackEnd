import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Likes } from 'src/likes/likes.schema';

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: String, required: true, trim: true })
  content: string;

  @Prop({ type: String, default: 'question' })
  postType?: string;

  @Prop({
    type: {
      type: String, // 'type' must be 'Point'
      enum: ['Point'], // Only 'Point' is allowed
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [50, 50],
    },
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;

  @Prop({
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() },
  })
  saved: { user: Types.ObjectId; createdAt?: Date; _id: Types.ObjectId }[];

  @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
  comments: Types.ObjectId[]; // References to Comment

  @Prop({ type: [Types.ObjectId], ref: Likes.name, default: [] })
  likes: Types.ObjectId[]; // References to Comment

  @Prop({ type: Number, default: 0 })
  likeCount: number;

  @Prop({ type: Number, default: 0 })
  commentCount: number;

  @Prop({ type: Number, default: 0 })
  savedCount: number;

  @Prop([String])
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export type QuestionDocument = HydratedDocument<Question>;
export const QuestionSchema = SchemaFactory.createForClass(Question);