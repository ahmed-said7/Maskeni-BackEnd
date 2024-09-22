import { HydratedDocument, Types } from 'mongoose';
export declare class Likes {
  user: Types.ObjectId;
  post: string;
  comment: string;
  type: string;
}
export type LikesDocument = HydratedDocument<Likes>;
export declare const LikesSchema: import('mongoose').Schema<
  Likes,
  import('mongoose').Model<
    Likes,
    any,
    any,
    any,
    import('mongoose').Document<unknown, any, Likes> &
      Likes & {
        _id: Types.ObjectId;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  Likes,
  import('mongoose').Document<
    unknown,
    {},
    import('mongoose').FlatRecord<Likes>
  > &
    import('mongoose').FlatRecord<Likes> & {
      _id: Types.ObjectId;
    }
>;
