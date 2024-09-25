import { QuarterService } from './quarter.service';
import { CreateQuarterDto } from './dto/quarter.create.dto';
import { QuarterQueryDto } from './dto/quarter.query.dto';
export declare class QuarterController {
    private readonly quarterService;
    constructor(quarterService: QuarterService);
    create(body: CreateQuarterDto): Promise<import("./quarter.schema").Quarter>;
    findAll(city: string): Promise<import("./quarter.schema").Quarter[]>;
    find(query: QuarterQueryDto): Promise<{
        quarters: (import("mongoose").Document<unknown, {}, import("./quarter.schema").Quarter> & import("./quarter.schema").Quarter & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    findOne(id: string): Promise<import("./quarter.schema").Quarter>;
    remove(id: string): Promise<{
        status: string;
    }>;
    getLocation(location: string): Promise<{
        quarter: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./quarter.schema").Quarter> & import("./quarter.schema").Quarter & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./quarter.schema").Quarter> & import("./quarter.schema").Quarter & {
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
}
