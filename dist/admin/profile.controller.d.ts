import { UpdatePasswordDto } from './dto/update.password.dto';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update.user.dto';
export declare class AdminProfileController {
    private adminService;
    constructor(adminService: AdminService);
    updatePassword(body: UpdatePasswordDto, req: any): Promise<{
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        status: string;
    }>;
    deleteUser(req: any): Promise<{
        status: string;
    }>;
    getUser(req: any): Promise<{
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateUser(req: any, body: UpdateAdminDto): Promise<{
        status: string;
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
