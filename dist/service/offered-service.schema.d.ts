import { HydratedDocument, Types } from 'mongoose';
export declare class Offered {
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
    name: string;
    postType?: string;
    details?: string;
    type?: string;
    city: Types.ObjectId;
    country: Types.ObjectId;
    quarter: Types.ObjectId;
    isDeleted: boolean;
    isAccepted: boolean;
    isArchived: boolean;
    saved: {
        user: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    requested: {
        user: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    likeCount: number;
    commentCount: number;
    savedCount: number;
    price: number;
    requestedCount: number;
    images: string[];
    user: Types.ObjectId;
}
export type OfferedDocument = HydratedDocument<Offered>;
export declare const OfferedSchema: import("mongoose").Schema<Offered, import("mongoose").Model<Offered, any, any, any, import("mongoose").Document<unknown, any, Offered> & Offered & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Offered, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Offered>> & import("mongoose").FlatRecord<Offered> & {
    _id: Types.ObjectId;
}>;
