import { Model } from 'mongoose';
import { Group, GroupDocument } from './group.schema';
import { UserDocument } from 'src/user/user.schema';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
export declare class GroupServices {
    private groupModel;
    private userModel;
    private apiService;
    constructor(groupModel: Model<GroupDocument>, userModel: Model<UserDocument>, apiService: ApiService<GroupDocument, FindQuery>);
    getAllGroups(obj: FindQuery, filter?: object): Promise<{
        groups: (import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    createGroup(body: CreateGroupDto, req: any): Promise<{
        group: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getUserGroups(obj: FindQuery, req: any): Promise<{
        groups: (import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    updateGroup(body: UpdateGroupDto, groupId: string, req: any): Promise<{
        group: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    leaveGroup(groupId: string, user: string): Promise<{
        status: string;
    }>;
    joinGroup(groupId: string, user: string): Promise<{
        status: string;
    }>;
    deleteGroup(groupId: string, req: any): Promise<{
        status: string;
    }>;
    getGroupMembers(groupId: string, req: any): Promise<{
        users: import("mongoose").Types.ObjectId[];
        admin: import("mongoose").Types.ObjectId;
    }>;
}
