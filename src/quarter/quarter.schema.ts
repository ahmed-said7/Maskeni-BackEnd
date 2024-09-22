import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Quarter {
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

  @Prop({ type: Types.ObjectId, ref: 'Country' })
  country: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'City' })
  city: Types.ObjectId;
}
export type QuarterDocument = HydratedDocument<Quarter>;
export const QuarterSchema = SchemaFactory.createForClass(Quarter);
