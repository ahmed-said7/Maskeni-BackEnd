import { LoginAdminDto } from './dto/login.dto';
import { SignupAdminDto } from './dto/signup.dto';
import { AdminService } from './admin.service';
export declare class AdminAuthController {
    private adminService;
    constructor(adminService: AdminService);
    login(body: LoginAdminDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signup(body: SignupAdminDto): Promise<{
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./admin.schema").Admin> & import("./admin.schema").Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
