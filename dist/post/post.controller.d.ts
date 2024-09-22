import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class PostController {
  private postService;
  constructor(postService: PostService);
  getPostComments(
    req: any,
    postId: string,
    query: FindQuery,
  ): Promise<{
    comments: (import('mongoose').Document<
      unknown,
      {},
      import('../comment/comment.schema').Comment
    > &
      import('../comment/comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  addPostComment(
    body: CreateCommentDto,
    req: any,
    postId: string,
  ): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('../comment/comment.schema').Comment
      > &
        import('../comment/comment.schema').Comment & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('../comment/comment.schema').Comment
      > &
      import('../comment/comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  deletePostComment(
    req: any,
    commentId: string,
  ): Promise<{
    status: string;
  }>;
  addLike(
    req: any,
    postId: string,
  ): Promise<{
    status: string;
  }>;
  removeLike(
    req: any,
    postId: string,
  ): Promise<{
    status: string;
  }>;
  getLike(
    req: any,
    postId: string,
    query: FindQuery,
  ): Promise<{
    likes: (import('mongoose').Document<
      unknown,
      {},
      import('../likes/likes.schema').Likes
    > &
      import('../likes/likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  createPost(
    req: any,
    body: CreatePostDto,
  ): Promise<{
    post: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./post.schema').Post> &
        import('./post.schema').Post & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./post.schema').Post> &
      import('./post.schema').Post & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getGroupPosts(
    req: any,
    groupId: string,
    query: FindQuery,
  ): Promise<{
    posts: (import('mongoose').Document<
      unknown,
      {},
      import('../group/group.schema').Group
    > &
      import('../group/group.schema').Group & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  deletePost(
    req: any,
    postId: string,
  ): Promise<{
    status: string;
  }>;
  updatePost(
    req: any,
    postId: string,
    body: UpdatePostDto,
  ): Promise<{
    status: string;
    post: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./post.schema').Post> &
        import('./post.schema').Post & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./post.schema').Post> &
      import('./post.schema').Post & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
}
