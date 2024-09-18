import { Post } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User_Role } from 'src/common/enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, trim: true, minlength: 4 })
  name: string;

  @Prop({ type: String, trim: true })
  mobile: string;

  @Prop({ type: String, trim: true })
  provider: string;

  @Prop({ type: String, trim: true })
  uid: string;

  @Prop({ type: String })
  bio: string;

  @Prop({ type: String, default: User_Role.User })
  role: string;

  @Prop({
    _id: Types.ObjectId,
    post: { type: Types.ObjectId, ref: Post.name },
    createdAt: { type: Date, default: new Date() },
  })
  savedGroupPost: {
    post: Types.ObjectId;
    createdAt?: Date;
    _id: Types.ObjectId;
  }[];

  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }] })
  //   savedEvents: Types.ObjectId[];

  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  //   followers: Types.ObjectId[];

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Date })
  verificationExpiresIn: Date;

  @Prop({ type: String })
  VerificationCode: string;

  @Prop({ type: Number, default: 0 })
  averageRating: number;

  @Prop({ type: Number, default: 0 })
  ratingQuantity: number;

  @Prop({ type: String })
  icon: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  fcm: string;

  @Prop({ type: Boolean, default: false })
  isBlocked: boolean;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
