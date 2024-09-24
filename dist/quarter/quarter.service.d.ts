import { Model } from 'mongoose';
import { Quarter, QuarterDocument } from './quarter.schema';
import { CreateQuarterDto } from './dto/quarter.create.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { QuarterQueryDto } from './dto/quarter.query.dto';
import { CountryService } from 'src/country/country.service';
import { CityService } from 'src/city/city.service';
export declare class QuarterService {
    private quarterModel;
    private apiService;
    private countryService;
    private cityService;
    constructor(quarterModel: Model<QuarterDocument>, apiService: ApiService<QuarterDocument, FindQuery>, countryService: CountryService, cityService: CityService);
    create(body: CreateQuarterDto): Promise<Quarter>;
    findAll(): Promise<Quarter[]>;
    findOne(id: string): Promise<Quarter>;
    getLocations(locs: [number, number][]): {
        type: string;
        coordinates: [number, number][][];
    };
    findQuarterContainingPoint(body: [number, number]): Promise<{
        quarter: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Quarter> & Quarter & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Quarter> & Quarter & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        city: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../city/city.schema").City> & import("../city/city.schema").City & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../city/city.schema").City> & import("../city/city.schema").City & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        country: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../country/country.schema").Country> & import("../country/country.schema").Country & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../country/country.schema").Country> & import("../country/country.schema").Country & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllQuarters(obj: QuarterQueryDto): Promise<{
        quarters: (import("mongoose").Document<unknown, {}, Quarter> & Quarter & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
