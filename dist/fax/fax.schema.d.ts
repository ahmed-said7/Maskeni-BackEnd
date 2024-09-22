import { HydratedDocument } from 'mongoose';
export declare class Fax {
  question: string;
  answer: string;
}
export type FaxDocument = HydratedDocument<Fax>;
export declare const FaxSchema: import('mongoose').Schema<
  Fax,
  import('mongoose').Model<
    Fax,
    any,
    any,
    any,
    import('mongoose').Document<unknown, any, Fax> &
      Fax & {
        _id: import('mongoose').Types.ObjectId;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  Fax,
  import('mongoose').Document<unknown, {}, import('mongoose').FlatRecord<Fax>> &
    import('mongoose').FlatRecord<Fax> & {
      _id: import('mongoose').Types.ObjectId;
    }
>;
