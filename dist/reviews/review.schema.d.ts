import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export declare class Review {
    rating: number;
    user: MongooseSchema.Types.ObjectId;
    review: MongooseSchema.Types.ObjectId;
}
export type ReviewDocument = HydratedDocument<Review>;
export declare const ReviewSchema: MongooseSchema<Review, import("mongoose").Model<Review, any, any, any, import("mongoose").Document<unknown, any, Review> & Review & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Review, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Review>> & import("mongoose").FlatRecord<Review> & {
    _id: import("mongoose").Types.ObjectId;
}>;
