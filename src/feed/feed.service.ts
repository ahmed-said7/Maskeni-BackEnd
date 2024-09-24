import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/event/event.schema';
// import { PostDocument, Post } from 'src/post/post.schema';
import { Question, QuestionDocument } from 'src/question/question.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { FeedQueryDto } from './dto/feed.query.dto';

export class FeedService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}
  async getFeed(query: FeedQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    delete query.page;
    delete query.limit;

    // Fetch data from all models with pagination at DB level
    const shares = await this.shareModel
      .find(query)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .skip(skip)
      .limit(limit);
    const voluntary = await this.voluntaryModel
      .find(query)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .skip(skip)
      .limit(limit);
    const offered = await this.serviceModel
      .find(query)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .skip(skip)
      .limit(limit);
    const questions = await this.questionModel
      .find(query)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .skip(skip)
      .limit(limit);

    const events = await this.eventModel
      .find(query)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .skip(skip)
      .limit(limit);

    // Combine all the data into one array
    const combinedFeed = [
      ...shares,
      ...voluntary,
      ...offered,
      ...questions,
      ...events,
    ];

    // // Sort the combined feed by 'createdAt' in descending order
    // const sortedFeed = combinedFeed.sort(
    //   (a, b) =>
    //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    // );

    // Return paginated feed along with pagination details
    const totalItems = combinedFeed.length;

    return {
      feed: combinedFeed,
      pagination: {
        total: totalItems,
        page,
        limit,
        pages: Math.ceil(totalItems / limit),
      },
    };
  }
}
