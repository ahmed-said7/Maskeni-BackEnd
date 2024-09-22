import { CommentService } from './comment.service';
import { FindQuery } from 'src/common/types';
export declare class CommentController {
  private commentService;
  constructor(commentService: CommentService);
  getCommentReplies(
    commentId: string,
    query: FindQuery,
  ): Promise<{
    comments: (import('mongoose').Document<
      unknown,
      {},
      import('./comment.schema').Comment
    > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
}
