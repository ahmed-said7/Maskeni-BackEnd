import { HydratedDocument, Types } from 'mongoose';
export declare class Event {
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
    name: string;
    postType?: string;
    details?: string;
    type?: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    gender?: string;
    date?: Date;
    startedAt?: Date;
    endedAt?: Date;
    startAge: number;
    endAge: number;
    isDeleted: boolean;
    isAccepted: boolean;
    isArchived: boolean;
    saved: {
        user: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    likeCount: number;
    commentCount: number;
    savedCount: number;
    price: number;
    images: string[];
    user: Types.ObjectId;
}
export type EventDocument = HydratedDocument<Event>;
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, import("mongoose").Document<unknown, any, Event> & Event & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: Types.ObjectId;
}>;
