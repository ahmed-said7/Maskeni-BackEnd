import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({
  timestamps: true,
})
export class Likes {
  @Prop({ ref: User.name, type: Types.ObjectId })
  user: Types.ObjectId;
  @Prop({ type: String })
  post: string;
}
export type LikesDocument = HydratedDocument<Likes>;
export const LikesSchema = SchemaFactory.createForClass(Likes);
