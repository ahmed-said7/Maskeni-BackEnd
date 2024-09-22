import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CommentDocument } from './comment.schema';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CommentQueryDto } from './dto/query.comment.dto';
export declare class CommentService {
  private commentModel;
  private apiService;
  constructor(
    commentModel: Model<CommentDocument>,
    apiService: ApiService<CommentDocument, CommentQueryDto>,
  );
  create(body: CreateCommentDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
        import('./comment.schema').Comment & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  findAll(obj: any): Promise<{
    comments: (import('mongoose').Document<
      unknown,
      {},
      import('./comment.schema').Comment
    > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  update(
    id: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
        import('./comment.schema').Comment & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  getOne(id: string): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
        import('./comment.schema').Comment & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  remove(id: string): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
        import('./comment.schema').Comment & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./comment.schema').Comment
      > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  private getComments;
  getCommentsReplies(
    commentId: string,
    obj: CommentQueryDto,
  ): Promise<{
    comments: (import('mongoose').Document<
      unknown,
      {},
      import('./comment.schema').Comment
    > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  getPostComments(
    ids: any[],
    obj: CommentQueryDto,
  ): Promise<{
    comments: (import('mongoose').Document<
      unknown,
      {},
      import('./comment.schema').Comment
    > &
      import('./comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
}
