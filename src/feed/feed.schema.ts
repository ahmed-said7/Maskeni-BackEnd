import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';
import { Likes } from 'src/likes/likes.schema';
import { Quarter } from 'src/quarter/quarter.schema';

@Schema({ timestamps: true })
export class Feed {
  @Prop({ type: String, required: true, trim: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: City.name })
  city: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: Country.name })
  country: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: Quarter.name })
  quarter: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;
  @Prop({ type: String })
  postType?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
  comments: Types.ObjectId[]; // References to Comment

  @Prop({ type: [Types.ObjectId], ref: Likes.name, default: [] })
  likes: Types.ObjectId[]; // References to Comment

  @Prop({
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() },
  })
  saved: { user: Types.ObjectId; createdAt?: Date; _id: Types.ObjectId }[];

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

  @Prop({ type: String })
  addressDetails: string;
  @Prop({ type: Boolean })
  isLiked: boolean;
  @Prop({ type: Boolean })
  isSaved: boolean;
  @Prop({ type: Date })
  savedAt: Date;
}

export type FeedDocument = HydratedDocument<Feed>;
export const FeedSchema = SchemaFactory.createForClass(Feed);
