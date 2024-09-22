import { HydratedDocument, Types } from 'mongoose';
export declare class Chat {
  admin: Types.ObjectId;
  lastMessage: Types.ObjectId;
  user: Types.ObjectId;
}
export type ChatDocument = HydratedDocument<Chat>;
export declare const ChatSchema: import('mongoose').Schema<
  Chat,
  import('mongoose').Model<
    Chat,
    any,
    any,
    any,
    import('mongoose').Document<unknown, any, Chat> &
      Chat & {
        _id: Types.ObjectId;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  Chat,
  import('mongoose').Document<
    unknown,
    {},
    import('mongoose').FlatRecord<Chat>
  > &
    import('mongoose').FlatRecord<Chat> & {
      _id: Types.ObjectId;
    }
>;
