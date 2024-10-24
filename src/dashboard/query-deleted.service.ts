import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Feed, FeedDocument } from 'src/feed/feed.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { DashboardDeletedDto } from './dto/dashboard.query.dto';
import { Group, GroupDocument } from 'src/group/group.schema';

@Injectable()
export class DashboardDeletedService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private apiService: ApiService<any, any>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}
  async getAllDeletedEvents(obj: DashboardDeletedDto) {
    // obj.isDeleted = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
      { isDeleted: true },
    );
    const events = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { events, pagination: paginationObj };
  }
  async getAllDeletedFeed(obj: DashboardDeletedDto) {
    // obj.isDeleted = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.feedModel.find(),
      obj,
      { isDeleted: true },
    );
    const posts = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { posts, pagination: paginationObj };
  }
  async getAllDeletedVoluntary(obj: DashboardDeletedDto) {
    // obj.isDeleted = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.voluntaryModel.find(),
      obj,
      { isDeleted: true },
    );
    const voluntary = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { voluntary, pagination: paginationObj };
  }
  async getAllDeletedGroup(obj: DashboardDeletedDto) {
    // obj.isDeleted = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.groupModel.find(),
      obj,
      { isDeleted: true },
    );
    const groups = await query
      .populate({
        path: 'admin',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { groups, pagination: paginationObj };
  }
  async getAllDeletedService(obj: DashboardDeletedDto) {
    // obj.isDeleted = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
      { isDeleted: true },
    );
    const events = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { events, pagination: paginationObj };
  }
  async getAllDeletedPosts(obj: DashboardDeletedDto) {
    // obj.isDeleted = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      { isDeleted: true },
    );
    const posts = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'group',
        model: 'Group',
        select: 'name image',
      })
      .setOptions({ skipFilter: true });
    return { posts, pagination: paginationObj };
  }
}
