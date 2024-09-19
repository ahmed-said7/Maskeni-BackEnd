import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Fax {
  @Prop({ type: String, trim: true, required: true })
  question: string;

  @Prop({ type: String, required: true })
  answer: string;
}

// Create Mongoose schema based on the class
export type FaxDocument = HydratedDocument<Fax>;
export const FaxSchema = SchemaFactory.createForClass(Fax);
