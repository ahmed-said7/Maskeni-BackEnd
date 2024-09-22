import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.schema';
import { LoginAdminDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { ApiService } from 'src/common/Api/api.service';
import { FindQuery } from 'src/common/types';
import { SignupAdminDto } from './dto/signup.dto';
import { UpdateAdminDto } from './dto/update.user.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshService } from 'src/refresh/refresh.service';
export declare class AdminService {
    private AdminModel;
    private refreshService;
    private apiService;
    constructor(AdminModel: Model<AdminDocument>, refreshService: RefreshService, apiService: ApiService<AdminDocument, FindQuery>, config: ConfigService);
    getAllAdmins(obj: FindQuery): Promise<{
        admins: (import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    login(body: LoginAdminDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updatepassword(body: UpdatePasswordDto, userId: string): Promise<{
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        status: string;
    }>;
    signup(body: SignupAdminDto): Promise<{
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    private validateMobile;
    updateUser(body: UpdateAdminDto, userId: string): Promise<{
        status: string;
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteUser(userId: string): Promise<{
        status: string;
    }>;
    getUser(userId: string): Promise<{
        admin: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
