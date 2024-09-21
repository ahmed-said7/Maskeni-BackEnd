import { FindQuery } from 'src/common/types';
import { PointDto } from './dto/point.dto';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create.country.dto';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    create(body: CreateCountryDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    find(query: FindQuery): Promise<{
        countries: (import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    findQuarterByLocation(body: PointDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./country.schema").Country> & import("./country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
