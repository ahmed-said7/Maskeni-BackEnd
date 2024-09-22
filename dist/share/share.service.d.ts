import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { UserDocument } from 'src/user/user.schema';
import { Share, ShareDocument } from './share.schema';
import { CreateShareDto } from './dto/create.share.dto';
import { UpdateShareDto } from './dto/update.share.dto';
import { QueryShareDto } from './dto/query.share.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class ShareService {
  private shareModel;
  private userModel;
  private reactionService;
  private apiService;
  constructor(
    shareModel: Model<ShareDocument>,
    userModel: Model<UserDocument>,
    reactionService: ReactionService<ShareDocument>,
    apiService: ApiService<ShareDocument, FindQuery>,
  );
  createShare(
    body: CreateShareDto,
    user: string,
  ): Promise<{
    event: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Share> &
        Share & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Share> &
      Share & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  updateShare(
    shareId: string,
    body: UpdateShareDto,
    user: string,
  ): Promise<{
    share: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Share> &
        Share & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Share> &
      Share & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  deleteShare(
    shareId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getShare(shareId: string): Promise<{
    share: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Share> &
        Share & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Share> &
      Share & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getAllShare(obj: QueryShareDto): Promise<{
    events: (import('mongoose').Document<unknown, {}, Share> &
      Share & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  addLike(
    shareId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  removeLike(
    shareId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getLikes(
    shareId: string,
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
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  addComment(
    body: CreateCommentDto,
    shareId: string,
    user: string,
  ): Promise<{
    status: string;
    comment: CreateCommentDto;
  }>;
  removeComment(
    commentId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getComments(
    shareId: string,
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
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  addSaved(
    shareId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  deleteSaved(
    shareId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getAllSaved(
    shareId: string,
    query: FindQuery,
  ): Promise<{
    totalPages: number;
    page: number;
    limit: number;
    saved: {
      user: import('mongoose').Types.ObjectId;
      createdAt?: Date;
    }[];
  }>;
}
