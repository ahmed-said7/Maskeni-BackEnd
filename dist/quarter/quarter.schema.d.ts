import { HydratedDocument } from 'mongoose';
export declare class Quarter {
    name: string;
    location: {
        type: string;
        coordinates: [number, number][][];
    };
    isDeleted: boolean;
}
export type QuarterDocument = HydratedDocument<Quarter>;
export declare const QuarterSchema: import("mongoose").Schema<Quarter, import("mongoose").Model<Quarter, any, any, any, import("mongoose").Document<unknown, any, Quarter> & Quarter & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quarter, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Quarter>> & import("mongoose").FlatRecord<Quarter> & {
    _id: import("mongoose").Types.ObjectId;
}>;