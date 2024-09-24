import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { RefreshService } from 'src/refresh/refresh.service';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class UserService {
    private Usermodel;
    private twilioService;
    private refreshService;
    private apiService;
    private firebaseService;
    constructor(Usermodel: Model<UserDocument>, twilioService: TwilioService, refreshService: RefreshService, apiService: ApiService<UserDocument, FindQuery>, firebaseService: FirebaseService);
    getAllUsers(obj: FindQuery): Promise<{
        users: (import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    signup(body: LoginUserDto): Promise<{
        status: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        code: string;
    }>;
    createGuest(): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private createHash;
    verifyPhone(code: string): Promise<{
        accessToken: string;
        refreshToken: string;
        status: string;
    }>;
    register(request: any): Promise<{
        accessToken: string;
        refreshToken: string;
        status: string;
    }>;
    private validateMobile;
    private validateEmail;
    updateUser(body: UpdateUserDto, userId: string): Promise<{
        status: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    blockUser(userId: string): Promise<{
        status: string;
    }>;
    deleteUser(userId: string): Promise<{
        status: string;
    }>;
    getUser(userId: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    addFollow(userId: string, user: string): Promise<{
        status: string;
    }>;
    removeFollow(userId: string, user: string): Promise<{
        status: string;
    }>;
    getUserFollowers(userId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        followers: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserFollwing(userId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        followers: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserSavedShare(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        savedShare: {
            share: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserSavedQuestion(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        savedQuestion: {
            question: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserSavedVoluntary(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        savedVoluntary: {
            voluntary: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserSavedGroupPosts(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        savedVoluntary: {
            voluntary: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserSavedEvent(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        savedEvent: {
            event: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserSavedService(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        savedService: {
            service: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
    getUserRequestedService(userId: string, query: FindQuery): Promise<{
        page: number;
        limit: number;
        requestedService: {
            service: import("mongoose").Types.ObjectId;
            createdAt?: Date;
            _id: import("mongoose").Types.ObjectId;
        }[];
    }>;
}
