import { HydratedDocument, Types } from 'mongoose';
export declare class Group {
    name: string;
    image: string;
    privacy: string;
    admin: Types.ObjectId;
    users: Types.ObjectId[];
}
export type GroupDocument = HydratedDocument<Group>;
export declare const GroupSchema: import("mongoose").Schema<Group, import("mongoose").Model<Group, any, any, any, import("mongoose").Document<unknown, any, Group> & Group & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Group, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Group>> & import("mongoose").FlatRecord<Group> & {
    _id: Types.ObjectId;
}>;