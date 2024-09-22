import { HydratedDocument, Types } from 'mongoose';
export declare class Address {
    city: Types.ObjectId;
    country: Types.ObjectId;
    quarter: Types.ObjectId;
    user: Types.ObjectId;
}
export type AddressDocument = HydratedDocument<Address>;
export declare const AddressSchema: import("mongoose").Schema<Address, import("mongoose").Model<Address, any, any, any, import("mongoose").Document<unknown, any, Address> & Address & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Address, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Address>> & import("mongoose").FlatRecord<Address> & {
    _id: Types.ObjectId;
}>;
