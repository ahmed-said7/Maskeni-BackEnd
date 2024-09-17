import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { User_Role } from 'src/common/enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, trim: true, minlength: 4 })
  name: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  mobile: string;

  @Prop({ type: String, required: true, minlength: 6 })
  password: string;

  @Prop({ type: String })
  bio: string;
  @Prop({ type: String, default: User_Role.User })
  role: string;

  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }] })
  //   savedEvents: Types.ObjectId[];

  //   @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  //   followers: Types.ObjectId[];

  @Prop({ type: Date })
  passwordChangedAt: Date;

  @Prop({ type: String })
  passwordResetCode: string;

  @Prop({ type: Date })
  passwordResetCodeExpiresIn: Date;

  @Prop({ type: Boolean })
  passwordResetCodeVerified: boolean;

  @Prop({ type: Boolean, default: false })
  mobileVerified: boolean;

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
