import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CreateOfferedDto } from './dto/create.service.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { OfferedService } from './offered-service.service';
export declare class OfferedController {
  private offeredService;
  constructor(offeredService: OfferedService);
  createEvent(
    body: CreateOfferedDto,
    req: any,
  ): Promise<{
    service: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./offered-service.schema').Offered
      > &
        import('./offered-service.schema').Offered & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./offered-service.schema').Offered
      > &
      import('./offered-service.schema').Offered & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getAllservices(query: QueryOfferedDto): Promise<{
    services: (import('mongoose').Document<
      unknown,
      {},
      import('./offered-service.schema').Offered
    > &
      import('./offered-service.schema').Offered & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  updateservice(
    serviceId: string,
    body: UpdateOfferedDto,
    req: any,
  ): Promise<{
    service: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./offered-service.schema').Offered
      > &
        import('./offered-service.schema').Offered & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./offered-service.schema').Offered
      > &
      import('./offered-service.schema').Offered & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  deleteservice(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  createserviceComment(
    serviceId: string,
    body: CreateCommentDto,
    req: any,
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
  getserviceComment(
    serviceId: string,
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
  deleteserviceComment(
    commentId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  addserviceLike(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  removeserviceLike(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  getserviceLikes(
    serviceId: string,
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
  addSavedservice(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  removeSavedservice(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  getSavedservices(
    serviceId: string,
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
  getservice(serviceId: string): Promise<{
    service: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./offered-service.schema').Offered
      > &
        import('./offered-service.schema').Offered & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./offered-service.schema').Offered
      > &
      import('./offered-service.schema').Offered & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  requestService(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  removeRequestService(
    serviceId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  getSavedRequested(
    serviceId: string,
    query: FindQuery,
  ): Promise<{
    totalPages: number;
    page: number;
    limit: number;
    requested: {
      user: import('mongoose').Types.ObjectId;
      createdAt?: Date;
    }[];
  }>;
}
