import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './group.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { Group_Privacy } from 'src/common/enum';

@Injectable()
export class GroupServices {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiService: ApiService<GroupDocument, FindQuery>,
  ) {}
  async getAllGroups(obj: FindQuery, filter?: object) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.groupModel.find(),
      obj,
      filter || {},
      ['name'],
    );
    const groups = await query;
    return { groups, pagination: paginationObj };
  }
  async createGroup(body: CreateGroupDto, req: any) {
    const users = await this.userModel.find({
      _id: { $in: body.users },
    });
    if (users.length !== body.users.length) {
      throw new HttpException('invalid user id', 400);
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
  async getUserGroups(obj: FindQuery, req: any) {
    return this.getAllGroups(obj, { users: req.userId });
  }
  async updateGroup(body: UpdateGroupDto, groupId: string, req: any) {
    const group = await this.groupModel.findOne({ _id: groupId });
    if (!group) {
      throw new HttpException('Group not found', 400);
    }
    if (group.admin.toString() != req.userId) {
      throw new HttpException('you are not group admin', 400);
    }
    const updatedGroup = await this.groupModel.findByIdAndUpdate(
      groupId,
      body,
      { new: true },
    );
    return { group: updatedGroup };
  }
  async leaveGroup(groupId: string, user: string) {
    const group = await this.groupModel.findOne({ _id: groupId, users: user });
    if (!group) {
      throw new HttpException('Group not found', 400);
    }
    if (group.admin.toString() == user) {
      throw new HttpException('you are group owner', 400);
    }
    await this.groupModel.findByIdAndUpdate(groupId, {
      $pull: { users: user },
    });
    return { status: 'user leaved group' };
  }
  async joinGroup(groupId: string, user: string) {
    const group = await this.groupModel.findOne({ _id: groupId });
    if (!group) {
      throw new HttpException('Group not found', 400);
    }
    await this.groupModel.findByIdAndUpdate(groupId, {
      $addToSet: { users: user },
    });
    return { status: 'user joined group' };
  }
  async deleteGroup(groupId: string, req: any) {
    const group = await this.groupModel.findOne({ _id: groupId });
    if (!group) {
      throw new HttpException('Group not found', 400);
    }
    if (group.admin.toString() != req.userId) {
      throw new HttpException('you are not group admin', 400);
    }
    await group.deleteOne();
    return { status: 'deleted' };
  }
  async getGroupMembers(groupId: string, req: any) {
    const group = await this.groupModel
      .findOne({ _id: groupId })
      .populate({ path: 'users', select: 'name mobile icon', model: 'User' })
      .populate({ path: 'admin', select: 'name mobile icon', model: 'User' });
    if (!group) {
      throw new HttpException('Group not found', 400);
    }
    if (
      !group.users.includes(req.userId) &&
      group.privacy == Group_Privacy.Private
    ) {
      throw new HttpException('user is not group member', 400);
    }
    return { users: group.users, admin: group.admin };
  }
}
