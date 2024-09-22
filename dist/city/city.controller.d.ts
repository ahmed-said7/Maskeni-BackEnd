import { CityService } from './city.service';
import { PointDto } from './dto/point.dto';
import { CreateCityDto } from './dto/city.create.dto';
import { CityQueryDto } from './dto/city.query.dto';
export declare class CityController {
  private readonly cityService;
  constructor(cityService: CityService);
  create(createCityDto: CreateCityDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
        import('./city.schema').City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
      import('./city.schema').City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  findAll(): Promise<
    (import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
        import('./city.schema').City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
      import('./city.schema').City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>)[]
  >;
  find(query: CityQueryDto): Promise<{
    quarters: (import('mongoose').Document<
      unknown,
      {},
      import('./city.schema').City
    > &
      import('./city.schema').City & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  findQuarterByLocation(body: PointDto): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
        import('./city.schema').City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
      import('./city.schema').City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  findOne(id: string): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
        import('./city.schema').City & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./city.schema').City> &
      import('./city.schema').City & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  remove(id: string): Promise<{
    status: string;
  }>;
}
