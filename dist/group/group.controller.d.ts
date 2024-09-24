import { GroupServices } from './group.service';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { FindQuery } from 'src/common/types';
export declare class GroupController {
    private groupService;
    constructor(groupService: GroupServices);
    getMyDeletedGroups(query: FindQuery, req: any): Promise<{
        groups: (import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getMyArchivedGroups(query: FindQuery, req: any): Promise<{
        groups: (import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    createGroup(body: CreateGroupDto, req: any): Promise<{
        group: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getGroupMembers(req: any, groupId: string): Promise<{
        users: import("mongoose").Types.ObjectId[];
        admin: import("mongoose").Types.ObjectId;
    }>;
    getGroups(query: FindQuery): Promise<{
        groups: (import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getUserGroups(req: any, query: FindQuery): Promise<{
        groups: (import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    leaveGroup(req: any, groupId: string): Promise<{
        status: string;
    }>;
    joinGroup(req: any, groupId: string): Promise<{
        status: string;
    }>;
    deleteGroup(req: any, groupId: string): Promise<{
        status: string;
    }>;
    updateGroup(req: any, body: UpdateGroupDto, groupId: string): Promise<{
        group: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./group.schema").Group> & import("./group.schema").Group & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
