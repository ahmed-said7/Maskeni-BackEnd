import { HydratedDocument } from 'mongoose';
export declare class Admin {
    name: string;
    mobile: string;
    password: string;
    passwordChangedAt: Date;
    role: string;
    icon: string;
    fcm: string;
}
export type AdminDocument = HydratedDocument<Admin>;
export declare const AdminSchema: import("mongoose").Schema<Admin, import("mongoose").Model<Admin, any, any, any, import("mongoose").Document<unknown, any, Admin> & Admin & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Admin, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Admin>> & import("mongoose").FlatRecord<Admin> & {
    _id: import("mongoose").Types.ObjectId;
}>;
