import { HydratedDocument, Types } from 'mongoose';
export declare class User {
    name: string;
    mobile: string;
    provider: string;
    uid: string;
    bio: string;
    role: string;
    savedGroupPost: {
        post: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    savedEvent: {
        event: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    savedShare: {
        share: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    savedQuestion: {
        question: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    savedVoluntary: {
        voluntary: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    followers: {
        user: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    following: {
        user: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    followersCount: number;
    followingCount: number;
    savedService: {
        service: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    requestedService: {
        service: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    active: boolean;
    verificationExpiresIn: Date;
    VerificationCode: string;
    averageRating: number;
    ratingQuantity: number;
    icon: string;
    fcm: string;
    isBlocked: boolean;
    gender: string;
    birthday: Date;
}
export type UserDocument = HydratedDocument<User>;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
