import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Admin_Role } from 'src/common/enum';

@Schema({
  timestamps: true,
})
export class Admin {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;
  @Prop({
    required: true,
    trim: true,
  })
  mobile: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: Date })
  passwordChangedAt: Date;
  @Prop({ default: Admin_Role.Admin, enum: Admin_Role })
  role: string;
  @Prop({ type: String })
  icon: string;
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  fcm: string;
}
export type AdminDocument = HydratedDocument<Admin>;
export const AdminSchema = SchemaFactory.createForClass(Admin);
