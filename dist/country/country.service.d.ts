import { Model } from 'mongoose';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { Country, CountryDocument } from './country.schema';
import { CreateCountryDto } from './dto/create.country.dto';
export declare class CountryService {
    private countryModel;
    private apiService;
    constructor(countryModel: Model<CountryDocument>, apiService: ApiService<CountryDocument, FindQuery>);
    create(body: CreateCountryDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getLocations(locs: [number, number][]): {
        type: string;
        coordinates: [number, number][][];
    };
    findCountryContainingPoint(body: [number, number]): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllCountries(obj: FindQuery): Promise<{
        countries: (import("mongoose").Document<unknown, {}, Country> & Country & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
