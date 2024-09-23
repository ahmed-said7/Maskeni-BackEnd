import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Question, QuestionDocument } from 'src/question/question.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { DashboardUpdateAcceptedDto } from './dto/dashboard.query.dto';

@Injectable()
export class SoftAcceptService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}
  async softAcceptQuestions(id: string, obj: DashboardUpdateAcceptedDto) {
    const question = await this.questionModel
      .findOneAndUpdate(
        {
          _id: id,
          isAccepted: !obj.isAccepted,
        },
        {
          isAccepted: obj.isAccepted,
          isDeleted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return { question };
  }
  async softAcceptEvents(id: string, obj: DashboardUpdateAcceptedDto) {
    const event = await this.eventModel
      .findOneAndUpdate(
        {
          _id: id,
          isAccepted: !obj.isAccepted,
        },
        {
          isAccepted: obj.isAccepted,
          isDeleted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!event) {
      throw new NotFoundException(`event with ID ${id} not found`);
    }
    return { event };
  }
  async softAcceptShares(id: string, obj: DashboardUpdateAcceptedDto) {
    const share = await this.shareModel
      .findOneAndUpdate(
        {
          _id: id,
          isAccepted: !obj.isAccepted,
        },
        {
          isAccepted: obj.isAccepted,
          isDeleted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!share) {
      throw new NotFoundException(`share with ID ${id} not found`);
    }
    return { share };
  }
  async softAcceptVoluntary(id: string, obj: DashboardUpdateAcceptedDto) {
    const voluntary = await this.voluntaryModel
      .findOneAndUpdate(
        {
          _id: id,
          isAccepted: !obj.isAccepted,
        },
        {
          isAccepted: obj.isAccepted,
          isDeleted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!voluntary) {
      throw new NotFoundException(`voluntary with ID ${id} not found`);
    }
    return { voluntary };
  }
  async softAcceptService(id: string, obj: DashboardUpdateAcceptedDto) {
    const service = await this.serviceModel
      .findOneAndUpdate(
        {
          _id: id,
          isAccepted: !obj.isAccepted,
        },
        {
          isAccepted: obj.isAccepted,
          isDeleted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!service) {
      throw new NotFoundException(`service with ID ${id} not found`);
    }
    return { service };
  }
  async softAcceptPosts(id: string, obj: DashboardUpdateAcceptedDto) {
    const post = await this.postModel
      .findOneAndUpdate(
        {
          _id: id,
          isAccepted: !obj.isAccepted,
        },
        {
          isAccepted: obj.isAccepted,
          isDeleted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!post) {
      throw new NotFoundException(`post with ID ${id} not found`);
    }
    return { post };
  }
}
