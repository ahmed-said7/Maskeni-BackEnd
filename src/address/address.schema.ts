import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';
import { Quarter } from 'src/quarter/quarter.schema';

@Schema()
export class Address {
  @Prop({ type: Types.ObjectId, ref: City.name })
  city: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: Country.name })
  country: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: Quarter.name })
  quarter: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
  @Prop({ type: [Number] })
  location: [number, number];
}
export type AddressDocument = HydratedDocument<Address>;
export const AddressSchema = SchemaFactory.createForClass(Address);
