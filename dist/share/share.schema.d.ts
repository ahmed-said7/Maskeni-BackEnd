import { HydratedDocument, Types } from 'mongoose';
export declare class Share {
  content: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  isDeleted: boolean;
  isAccepted: boolean;
  isArchived: boolean;
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  saved: {
    user: Types.ObjectId;
    createdAt?: Date;
    _id: Types.ObjectId;
  }[];
  likeCount: number;
  commentCount: number;
  savedCount: number;
  images: string[];
  user: Types.ObjectId;
}
export type ShareDocument = HydratedDocument<Share>;
export declare const ShareSchema: import('mongoose').Schema<
  Share,
  import('mongoose').Model<
    Share,
    any,
    any,
    any,
    import('mongoose').Document<unknown, any, Share> &
      Share & {
        _id: Types.ObjectId;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  Share,
  import('mongoose').Document<
    unknown,
    {},
    import('mongoose').FlatRecord<Share>
  > &
    import('mongoose').FlatRecord<Share> & {
      _id: Types.ObjectId;
    }
>;
