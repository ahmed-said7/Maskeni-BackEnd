import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { City } from 'src/city/city.schema';
import { Group_Privacy } from 'src/common/enum';
import { Country } from 'src/country/country.schema';
import { Quarter } from 'src/quarter/quarter.schema';

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
    ref: 'User',
  })
  admin: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: City.name })
  city: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: Country.name })
  country: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: Quarter.name })
  quarter: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // Array of user references
  users: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;

  @Prop({ type: String })
  addressDetails: string;
}
export type GroupDocument = HydratedDocument<Group>;
// Generate the schema for Mongoose using the SchemaFactory
export const GroupSchema = SchemaFactory.createForClass(Group);
