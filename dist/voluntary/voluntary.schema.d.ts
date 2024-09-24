import { HydratedDocument, Types } from 'mongoose';
export declare class Voluntary {
    name: string;
    postType?: string;
    details?: string;
    type?: string;
    gender?: string;
    date?: Date;
    startedAt?: Date;
    endedAt?: Date;
    startAge: number;
    endAge: number;
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
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
    likeCount: number;
    commentCount: number;
    savedCount: number;
    images: string[];
    user: Types.ObjectId;
}
export type VoluntaryDocument = HydratedDocument<Voluntary>;
export declare const VoluntarySchema: import("mongoose").Schema<Voluntary, import("mongoose").Model<Voluntary, any, any, any, import("mongoose").Document<unknown, any, Voluntary> & Voluntary & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Voluntary, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Voluntary>> & import("mongoose").FlatRecord<Voluntary> & {
    _id: Types.ObjectId;
}>;
