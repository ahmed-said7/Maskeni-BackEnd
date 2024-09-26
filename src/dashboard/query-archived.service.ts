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
import { DashboardArchivedDto } from './dto/dashboard.query.dto';

@Injectable()
export class DashboardArchivedService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    private apiService: ApiService<any, any>,
  ) {}
  async getAllArchivedQuestions(obj: DashboardArchivedDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.questionModel.find(),
      obj,
      { isArchived: true },
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
  async getAllArchivedEvents(obj: DashboardArchivedDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
      { isArchived: true },
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
  async getAllArchivedShares(obj: DashboardArchivedDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.shareModel.find(),
      obj,
      { isArchived: true },
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
  async getAllArchivedVoluntary(obj: DashboardArchivedDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.voluntaryModel.find(),
      obj,
      { isArchived: true },
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
  async getAllArchivedService(obj: DashboardArchivedDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
      { isArchived: true },
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
  async getAllArchivedPosts(obj: DashboardArchivedDto) {
    // obj.isArchived = true;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      { isArchived: true },
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
