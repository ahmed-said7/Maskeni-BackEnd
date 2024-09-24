import { HydratedDocument, Types } from 'mongoose';
export declare class Ticket {
    isPaid?: Date;
    quantity?: number;
    qrCode?: string;
    user: Types.ObjectId;
    event: Types.ObjectId;
    eventOwner: Types.ObjectId;
}
export type TicketDocument = HydratedDocument<Ticket>;
export declare const TicketSchema: import("mongoose").Schema<Ticket, import("mongoose").Model<Ticket, any, any, any, import("mongoose").Document<unknown, any, Ticket> & Ticket & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ticket, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Ticket>> & import("mongoose").FlatRecord<Ticket> & {
    _id: Types.ObjectId;
}>;
