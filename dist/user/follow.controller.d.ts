import { UserService } from './user.service';
import { FindQuery } from 'src/common/types';
export declare class UserFollowController {
  private userService;
  constructor(userService: UserService);
  addFollow(
    req: any,
    id: string,
  ): Promise<{
    status: string;
  }>;
  removeFollow(
    req: any,
    id: string,
  ): Promise<{
    status: string;
  }>;
  getFollowers(
    id: string,
    query: FindQuery,
  ): Promise<{
    totalPages: number;
    page: number;
    limit: number;
    followers: {
      user: import('mongoose').Types.ObjectId;
      createdAt?: Date;
      _id: import('mongoose').Types.ObjectId;
    }[];
  }>;
  getFollowing(
    id: string,
    query: FindQuery,
  ): Promise<{
    totalPages: number;
    page: number;
    limit: number;
    followers: {
      user: import('mongoose').Types.ObjectId;
      createdAt?: Date;
      _id: import('mongoose').Types.ObjectId;
    }[];
  }>;
}
