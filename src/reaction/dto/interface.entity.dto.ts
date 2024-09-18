import { HydratedDocument, Types } from 'mongoose';

interface IEntity {
  saved: { user: Types.ObjectId; createdAt?: Date }[];
  likes: { user: Types.ObjectId; createdAt?: Date }[];
  comments: { content: string; user: Types.ObjectId; _id?: Types.ObjectId }[];
  likeCount: number;
  commentCount: number;
  savedCount: number;
  user: Types.ObjectId;
}
export type IEntityType = HydratedDocument<IEntity>;
