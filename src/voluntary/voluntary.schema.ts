import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Event_Type, Gender_Type } from 'src/common/types';
import { Likes } from 'src/likes/likes.schema';

@Schema({ timestamps: true })
export class Voluntary {
  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, default: 'voluntary' })
  postType?: string;

  @Prop({ type: String })
  details?: string;

  @Prop({ type: String, enum: Event_Type, default: Event_Type.community })
  type?: string;

  @Prop({ type: String, default: Gender_Type.all })
  gender?: string;

  @Prop({ type: Date })
  date?: Date;

  @Prop({ type: Date })
  startedAt?: Date;

  @Prop({ type: Date })
  endedAt?: Date;

  @Prop({ type: Number })
  startAge: number;

  @Prop({ type: Number })
  endAge: number;

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

export type VoluntaryDocument = HydratedDocument<Voluntary>;
export const VoluntarySchema = SchemaFactory.createForClass(Voluntary);