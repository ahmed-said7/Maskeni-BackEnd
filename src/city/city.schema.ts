import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class City {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: [[[Number]]],
  })
  location: {
    type: string;
    coordinates: [number, number][][];
  };
  @Prop({ type: Boolean })
  isDeleted: boolean;
}
export type CityDocument = HydratedDocument<City>;
export const CitySchema = SchemaFactory.createForClass(City);
