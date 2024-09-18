import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Number, required: true }) // Rating for the review
  rating: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  }) // User who gave the review
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  review: MongooseSchema.Types.ObjectId;
}
export type ReviewDocument = HydratedDocument<Review>;
// Create the schema from the class
export const ReviewSchema = SchemaFactory.createForClass(Review);
