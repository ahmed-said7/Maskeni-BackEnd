import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Question, QuestionDocument } from 'src/question/question.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel(Offered.name)
    private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}
  async getAllDocs() {
    const voluntaryCount = await this.voluntaryModel.countDocuments();
    const shareCount = await this.shareModel.countDocuments();
    const eventCount = await this.eventModel.countDocuments();
    const postCount = await this.postModel.countDocuments();
    const questionCount = await this.questionModel.countDocuments();
    const serviceCount = await this.serviceModel.countDocuments();
    const totalCount =
      voluntaryCount +
      shareCount +
      eventCount +
      postCount +
      questionCount +
      serviceCount;
    return {
      totalCount,
      eventCount,
      postCount,
      questionCount,
      shareCount,
      serviceCount,
      voluntaryCount,
    };
  }
}
