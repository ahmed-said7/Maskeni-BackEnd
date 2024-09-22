import { QuarterService } from './quarter.service';
import { CreateQuarterDto } from './dto/quarter.create.dto';
import { PointDto } from './dto/point.dto';
import { QuarterQueryDto } from './dto/quarter.query.dto';
export declare class QuarterController {
    private readonly quarterService;
    constructor(quarterService: QuarterService);
    create(body: CreateQuarterDto): Promise<import("./quarter.schema").Quarter>;
    findAll(): Promise<import("./quarter.schema").Quarter[]>;
    find(query: QuarterQueryDto): Promise<{
        quarters: (import("mongoose").Document<unknown, {}, import("./quarter.schema").Quarter> & import("./quarter.schema").Quarter & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    findQuarterByLocation(body: PointDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./quarter.schema").Quarter> & import("./quarter.schema").Quarter & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./quarter.schema").Quarter> & import("./quarter.schema").Quarter & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findOne(id: string): Promise<import("./quarter.schema").Quarter>;
    remove(id: string): Promise<{
        status: string;
    }>;
}
