import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Likes {
  @Prop({ ref: 'User', type: Types.ObjectId })
  user: Types.ObjectId;
  @Prop({ type: String })
  post: string;
  @Prop({ type: String })
  comment: string;
  @Prop({ type: String, default: 'like' })
  type: string;
}
export type LikesDocument = HydratedDocument<Likes>;
export const LikesSchema = SchemaFactory.createForClass(Likes);
