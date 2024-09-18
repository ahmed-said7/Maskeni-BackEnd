import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Group_Privacy } from 'src/common/enum';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Group {
  @Prop({ required: true, trim: true, minlength: 3, maxlength: 100 }) // Validates the length of the name
  name: string;

  @Prop({ type: String, default: null })
  image: string;

  @Prop({ type: String, enum: Group_Privacy, default: Group_Privacy.Public })
  privacy: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  admin: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] }) // Array of user references
  users: Types.ObjectId[];
}
export type GroupDocument = HydratedDocument<Group>;
// Generate the schema for Mongoose using the SchemaFactory
export const GroupSchema = SchemaFactory.createForClass(Group);
