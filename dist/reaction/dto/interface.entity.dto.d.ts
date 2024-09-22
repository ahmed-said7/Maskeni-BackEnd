import { HydratedDocument, Types } from 'mongoose';
interface IEntity {
  saved: {
    user: Types.ObjectId;
    createdAt?: Date;
  }[];
  requested?: {
    user: Types.ObjectId;
    createdAt?: Date;
  }[];
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  likeCount: number;
  commentCount: number;
  savedCount: number;
  user: Types.ObjectId;
  requestedCount?: number;
}
export type IEntityType = HydratedDocument<IEntity>;
export {};
