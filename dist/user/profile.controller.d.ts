import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';
export declare class UserProfileController {
    private userService;
    constructor(userService: UserService);
    deleteUser(req: any): Promise<{
        status: string;
    }>;
    getUser(req: any): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateUser(req: any, body: UpdateUserDto): Promise<{
        status: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateAddress(req: any, location: string): Promise<{
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
        quarter: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../quarter/quarter.schema").Quarter> & import("../quarter/quarter.schema").Quarter & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../quarter/quarter.schema").Quarter> & import("../quarter/quarter.schema").Quarter & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
        status: string;
    }>;
}
