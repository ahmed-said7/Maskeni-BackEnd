import { Model } from 'mongoose';
import { City, CityDocument } from './city.schema';
import { PointDto } from './dto/point.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { CreateCityDto } from './dto/city.create.dto';
import { CityQueryDto } from './dto/city.query.dto';
export declare class CityService {
  private cityModel;
  private apiService;
  constructor(
    cityModel: Model<CityDocument>,
    apiService: ApiService<CityDocument, FindQuery>,
  );
  create(body: CreateCityDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, City> &
        City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, City> &
      City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  findAll(): Promise<
    (import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, City> &
        City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, City> &
      City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>)[]
  >;
  findOne(id: string): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, City> &
        City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, City> &
      City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  getLocations(locs: [number, number][]): {
    type: string;
    coordinates: [number, number][][];
  };
  findCityContainingPoint(pointDto: PointDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, City> &
        City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, City> &
      City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  getAllCities(obj: CityQueryDto): Promise<{
    quarters: (import('mongoose').Document<unknown, {}, City> &
      City & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  remove(id: string): Promise<{
    status: string;
  }>;
}
