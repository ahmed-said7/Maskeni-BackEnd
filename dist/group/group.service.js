"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("./group.schema");
const user_schema_1 = require("../user/user.schema");
const api_service_1 = require("../common/Api/api.service");
const enum_1 = require("../common/enum");
let GroupServices = class GroupServices {
    constructor(groupModel, userModel, apiService) {
        this.groupModel = groupModel;
        this.userModel = userModel;
        this.apiService = apiService;
    }
    async getAllGroups(obj, filter) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.groupModel.find(), obj, filter || {}, ['name']);
        const groups = await query;
        return { groups, pagination: paginationObj };
    }
    async createGroup(body, req) {
        const users = await this.userModel.find({
            _id: { $in: body.users },
        });
        if (users.length !== body.users.length) {
            throw new common_1.HttpException('invalid user id', 400);
        }
        if (!body.users.includes(req.userId)) {
            body.users.push(req.userId);
        }
        const group = await this.groupModel.create({
            ...body,
            admin: req.userId,
        });
        return { group };
    }
    async getUserGroups(obj, req) {
        return this.getAllGroups(obj, { users: req.userId });
    }
    async updateGroup(body, groupId, req) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException('Group not found', 400);
        }
        if (group.admin.toString() != req.userId) {
            throw new common_1.HttpException('you are not group admin', 400);
        }
        const updatedGroup = await this.groupModel.findByIdAndUpdate(groupId, body, { new: true });
        return { group: updatedGroup };
    }
    async leaveGroup(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId, users: user });
        if (!group) {
            throw new common_1.HttpException('Group not found', 400);
        }
        if (group.admin.toString() == user) {
            throw new common_1.HttpException('you are group owner', 400);
        }
        await this.groupModel.findByIdAndUpdate(groupId, {
            $pull: { users: user },
        });
        return { status: 'user leaved group' };
    }
    async joinGroup(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException('Group not found', 400);
        }
        await this.groupModel.findByIdAndUpdate(groupId, {
            $addToSet: { users: user },
        });
        return { status: 'user joined group' };
    }
    async deleteGroup(groupId, req) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException('Group not found', 400);
        }
        if (group.admin.toString() != req.userId) {
            throw new common_1.HttpException('you are not group admin', 400);
        }
        group.isDeleted = true;
        await group.save();
        return { status: 'deleted' };
    }
    async getGroupMembers(groupId, req) {
        const group = await this.groupModel
            .findOne({ _id: groupId })
            .populate({ path: 'users', select: 'name mobile icon', model: 'User' })
            .populate({ path: 'admin', select: 'name mobile icon', model: 'User' });
        if (!group) {
            throw new common_1.HttpException('Group not found', 400);
        }
        if (!group.users.includes(req.userId) &&
            group.privacy == enum_1.Group_Privacy.Private) {
            throw new common_1.HttpException('user is not group member', 400);
        }
        return { users: group.users, admin: group.admin };
    }
    async getMyArchivedGroups(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.groupModel.find(), obj, { isArchived: true });
        const groups = await query.setOptions({ skipFilter: true });
        return { groups, pagination: paginationObj };
    }
    async getMyDeletedGroups(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.groupModel.find(), obj, { isDeleted: true });
        const groups = await query.setOptions({ skipFilter: true });
        return { groups, pagination: paginationObj };
    }
};
exports.GroupServices = GroupServices;
exports.GroupServices = GroupServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        api_service_1.ApiService])
], GroupServices);
//# sourceMappingURL=group.service.js.map