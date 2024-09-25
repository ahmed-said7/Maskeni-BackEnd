import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gender_Type } from 'src/common/types';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Question, QuestionDocument } from 'src/question/question.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { User, UserDocument } from 'src/user/user.schema';
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
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
  async analysisUsers() {
    const totalMales = await this.userModel.countDocuments({
      gender: Gender_Type.male,
    });
    const totalFemales = await this.userModel.countDocuments({
      gender: Gender_Type.female,
    });
    return { totalFemales, totalMales };
  }
  async getAgeStatistics() {
    const currentDate = new Date();

    const stats = await this.userModel.aggregate([
      // Project to calculate the age from the birthday
      {
        $addFields: {
          age: {
            $floor: {
              $divide: [
                { $subtract: [currentDate, '$birthday'] },
                1000 * 60 * 60 * 24 * 365.25, // Convert milliseconds to years
              ],
            },
          },
        },
      },
      // Group by different age ranges and calculate the total
      {
        $facet: {
          ageBetween18And25: [
            {
              $match: {
                age: { $gte: 18, $lte: 25 },
              },
            },
            {
              $count: 'count', // Count number of users aged between 18 and 25
            },
          ],
          ageBetween26And49: [
            {
              $match: {
                age: { $gte: 26, $lte: 49 },
              },
            },
            {
              $count: 'count', // Count number of users aged between 18 and 25
            },
          ],
          ageGreaterThan50: [
            {
              $match: {
                age: { $gt: 50 },
              },
            },
            {
              $count: 'count', // Count number of users aged greater than 50
            },
          ],
        },
      },
    ]);

    // Return results
    return stats;
  }
}
