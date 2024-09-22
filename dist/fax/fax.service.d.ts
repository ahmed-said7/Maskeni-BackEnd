import { Model } from 'mongoose';
import { Fax, FaxDocument } from './fax.schema';
import { CreateFaxDto } from './dto/create.fax.dto';
import { UpdateFaxDto } from './dto/update.fax.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
export declare class FaxService {
    private faxModel;
    private apiService;
    constructor(faxModel: Model<FaxDocument>, apiService: ApiService<FaxDocument, FindQuery>);
    createFax(body: CreateFaxDto): Promise<{
        fax: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Fax> & Fax & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Fax> & Fax & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteFax(id: string): Promise<{
        status: string;
    }>;
    getAllFaxs(obj: FindQuery): Promise<{
        events: (import("mongoose").Document<unknown, {}, Fax> & Fax & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    updateFax(body: UpdateFaxDto, faxId: string): Promise<{
        fax: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Fax> & Fax & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Fax> & Fax & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
