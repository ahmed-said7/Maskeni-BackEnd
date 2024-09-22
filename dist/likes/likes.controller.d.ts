import { LikesService } from './likes.service';
import { FindQuery } from 'src/common/types';
export declare class LikesController {
  private likesService;
  constructor(likesService: LikesService);
  addLike(
    commentId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  deleteLike(
    commentId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  getCommentLikes(
    commentId: string,
    query: FindQuery,
  ): Promise<{
    likes: (import('mongoose').Document<
      unknown,
      {},
      import('./likes.schema').Likes
    > &
      import('./likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
}
