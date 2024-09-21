import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';
export declare class UserAuthController {
    private userService;
    constructor(userService: UserService);
    loginUsingMobile(body: LoginUserDto): Promise<{
        status: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        code: string;
    }>;
    loginFirebase(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        status: string;
    }>;
    verifyCode(code: string): Promise<{
        accessToken: string;
        refreshToken: string;
        status: string;
    }>;
    loginAsGuest(): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
