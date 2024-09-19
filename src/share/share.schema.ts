import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Share {
  @Prop({ type: String, required: true, trim: true })
  content: string;

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

  @Prop([String])
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export type ShareDocument = HydratedDocument<Share>;
export const ShareSchema = SchemaFactory.createForClass(Share);
