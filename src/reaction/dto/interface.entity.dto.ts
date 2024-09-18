import { Types } from 'mongoose';

export interface IEntity extends Document {
  saved: { user: string; createdAt?: Date }[];
  likes: { user: string; createdAt?: Date }[];
  comments: { content: string; user: string; _id?: Types.ObjectId }[];
  likeCount: number;
  commentCount: number;
  savedCount: number;
  owner: Types.ObjectId;
}
