import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { DashboardAcceptedDto } from './dto/dashboard.query.dto';
import { Group, GroupDocument } from 'src/group/group.schema';
import { Feed, FeedDocument } from 'src/feed/feed.schema';

@Injectable()
export class DashboardAcceptedService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private apiService: ApiService<any, any>,
  ) {}
  async getAllAcceptedEvents(obj: DashboardAcceptedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
    );
    console.log(obj);
    const events = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { events, pagination: paginationObj };
  }
  async getAllAcceptedFeed(obj: DashboardAcceptedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.feedModel.find(),
      obj,
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
  async getAllAcceptedVoluntary(obj: DashboardAcceptedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.voluntaryModel.find(),
      obj,
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
  async getAllAcceptedService(obj: DashboardAcceptedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
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
  async getAllAcceptedPosts(obj: DashboardAcceptedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
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
  async getAllAcceptedGroups(obj: DashboardAcceptedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.groupModel.find(),
      obj,
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
}
