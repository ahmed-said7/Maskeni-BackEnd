import { Model } from 'mongoose';
import { LikesDocument } from './likes.schema';
import { ApiService } from 'src/common/Api/api.service';
import { LikeDto } from './dto/create.likes.dto';
import { LikesQueryDto } from './dto/query.likes.dto';
import { CommentDocument } from 'src/comment/comment.schema';
export declare class LikesService {
  private likesModel;
  private commentModel;
  private apiService;
  constructor(
    likesModel: Model<LikesDocument>,
    commentModel: Model<CommentDocument>,
    apiService: ApiService<LikesDocument, LikesQueryDto>,
  );
  addLikeToPost(likeDto: LikeDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./likes.schema').Likes> &
        import('./likes.schema').Likes & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./likes.schema').Likes> &
      import('./likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  removeLikeFromPost(likeDto: LikeDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./likes.schema').Likes> &
        import('./likes.schema').Likes & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./likes.schema').Likes> &
      import('./likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  addlikeToComment(
    comment: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  removeikeFromComment(
    comment: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getCommentLikes(
    commentId: string,
    obj: LikesQueryDto,
  ): Promise<{
    likes: (import('mongoose').Document<
      unknown,
      {},
      import('./likes.schema').Likes
    > &
      import('./likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  getPostLikes(
    ids: any[],
    obj: LikesQueryDto,
  ): Promise<{
    likes: (import('mongoose').Document<
      unknown,
      {},
      import('./likes.schema').Likes
    > &
      import('./likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
}
