import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from 'src/address/address.schema';
import { Gender_Type } from 'src/common/types';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Feed, FeedDocument } from 'src/share/feed.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectModel(Offered.name)
    private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}
  async getPeopleByQuarterNotInArray(page: string, limit: string) {
    const result = await this.addressModel.aggregate([
      // Stage 2: Group by quarter and user to ensure unique users
      {
        $group: {
          _id: { quarter: '$quarter', user: '$user' }, // Group by quarter and user
        },
      },
      // Stage 3: Group by quarter and count unique users
      {
        $group: {
          _id: '$_id.quarter', // Group by quarter
          numberOfPeople: { $sum: 1 }, // Count unique users in each quarter
        },
      },
      // Log to check the current state before lookup
      {
        $project: {
          _id: 1, // Include _id for lookup
          numberOfPeople: 1,
        },
      },
      // Optional: Populate the quarter information if needed
      {
        $addFields: {
          quarterIdAsObjectId: { $toObjectId: '$_id' }, // Convert _id (quarter) to ObjectId
        },
      },
      // Stage 5: Populate the quarter information using the new ObjectId field
      {
        $lookup: {
          from: 'quarters', // The collection for the Quarter schema
          localField: 'quarterIdAsObjectId', // Use the converted ObjectId field
          foreignField: '_id', // Match with _id in the quarters collection
          as: 'quarterInfo',
        },
      },
      { $skip: (parseInt(page) - 1) * parseInt(limit) },
      { $limit: parseInt(limit) },
    ]);
    // Log the aggregation result
    return result;
  }
  async getAllDocs() {
    const voluntaryCount = await this.voluntaryModel.countDocuments();
    const shareCount = await this.feedModel.countDocuments();
    const eventCount = await this.eventModel.countDocuments();
    const postCount = await this.postModel.countDocuments();
    const serviceCount = await this.serviceModel.countDocuments();
    const totalCount =
      voluntaryCount + shareCount + eventCount + postCount + serviceCount;
    return {
      totalCount,
      eventCount,
      postCount,
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
