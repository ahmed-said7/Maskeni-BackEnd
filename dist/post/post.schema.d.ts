import { HydratedDocument, Types } from 'mongoose';
export declare class Post {
  content: string;
  image?: string;
  user: Types.ObjectId;
  group: Types.ObjectId;
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
  isDeleted: boolean;
  isAccepted: boolean;
  isArchived: boolean;
}
export type PostDocument = HydratedDocument<Post>;
export declare const PostSchema: import('mongoose').Schema<
  Post,
  import('mongoose').Model<
    Post,
    any,
    any,
    any,
    import('mongoose').Document<unknown, any, Post> &
      Post & {
        _id: Types.ObjectId;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  Post,
  import('mongoose').Document<
    unknown,
    {},
    import('mongoose').FlatRecord<Post>
  > &
    import('mongoose').FlatRecord<Post> & {
      _id: Types.ObjectId;
    }
>;
