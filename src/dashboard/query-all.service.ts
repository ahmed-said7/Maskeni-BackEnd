import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Question, QuestionDocument } from 'src/question/question.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { DashboardSearchDto } from './dto/dashboard.query.dto';
import { Group, GroupDocument } from 'src/group/group.schema';

@Injectable()
export class QueryAllService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private apiService: ApiService<any, any>,
  ) {}
  async getAllQuestions(obj: DashboardSearchDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.questionModel.find(),
      obj,
    );
    const questions = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { questions, pagination: paginationObj };
  }
  async getAllEvents(obj: DashboardSearchDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
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
  async getAllShares(obj: DashboardSearchDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.shareModel.find(),
      obj,
    );
    const shares = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .setOptions({ skipFilter: true });
    return { shares, pagination: paginationObj };
  }
  async getAllVoluntary(obj: DashboardSearchDto) {
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
  async getAllService(obj: DashboardSearchDto) {
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
  async getAllPosts(obj: DashboardSearchDto) {
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
  async getAllGroups(obj: DashboardSearchDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.groupModel.find(),
      obj,
      // { isArchived: true },
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
