import { Model } from 'mongoose';
import { Quarter, QuarterDocument } from './quarter.schema';
import { CreateQuarterDto } from './dto/quarter.create.dto';
import { PointDto } from './dto/point.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { QuarterQueryDto } from './dto/quarter.query.dto';
export declare class QuarterService {
  private quarterModel;
  private apiService;
  constructor(
    quarterModel: Model<QuarterDocument>,
    apiService: ApiService<QuarterDocument, FindQuery>,
  );
  create(body: CreateQuarterDto): Promise<Quarter>;
  findAll(): Promise<Quarter[]>;
  findOne(id: string): Promise<Quarter>;
  getLocations(locs: [number, number][]): {
    type: string;
    coordinates: [number, number][][];
  };
  findQuarterContainingPoint(body: PointDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Quarter> &
        Quarter & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Quarter> &
      Quarter & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  getAllQuarters(obj: QuarterQueryDto): Promise<{
    quarters: (import('mongoose').Document<unknown, {}, Quarter> &
      Quarter & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  remove(id: string): Promise<{
    status: string;
  }>;
}
