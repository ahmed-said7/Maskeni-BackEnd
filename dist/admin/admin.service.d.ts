import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.schema';
import { LoginAdminDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { ApiService } from 'src/common/Api/api.service';
import { FindQuery } from 'src/common/types';
import { SignupAdminDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshService } from 'src/refresh/refresh.service';
import { QuarterService } from 'src/quarter/quarter.service';
import { UpdateAdminDto } from './dto/update.user.dto';
export declare class AdminService {
    private AdminModel;
    private refreshService;
    private apiService;
    private quarterService;
    constructor(AdminModel: Model<AdminDocument>, refreshService: RefreshService, apiService: ApiService<AdminDocument, FindQuery>, config: ConfigService, quarterService: QuarterService);
    getAllAdmins(obj: FindQuery): Promise<{
        admins: (import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    updateQuarter(userId: string, role: string, body: [number, number]): Promise<{
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
    login(body: LoginAdminDto): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Admin> & Admin & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
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
