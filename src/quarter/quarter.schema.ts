import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}
export type QuarterDocument = HydratedDocument<Quarter>;
export const QuarterSchema = SchemaFactory.createForClass(Quarter);
