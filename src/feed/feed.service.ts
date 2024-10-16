import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/event/event.schema';
// import { PostDocument, Post } from 'src/post/post.schema';
import { Question, QuestionDocument } from 'src/question/question.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { FeedQueryDto } from './dto/feed.query.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { Quarter } from 'src/quarter/quarter.schema';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';
import { NotFoundException } from '@nestjs/common';

export class FeedService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async getFeed(query: FeedQueryDto, userId: string) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const half = Math.floor(limit / 2);
    delete query.page;
    delete query.limit;
    const sharesCount = await this.shareModel.countDocuments(query);
    const questionsCount = await this.questionModel.countDocuments(query);
    const count = sharesCount + questionsCount;
    const currentPage = page;
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const numOfPages = Math.floor(count / limit);
    const remainingShares = await this.shareModel
      .countDocuments(query)
      .skip(skip)
      .limit(half);
    const remainingQuestions = await this.questionModel
      .countDocuments(query)
      .skip(skip)
      .limit(half);
    let shareLimit = half;
    let questionLimit = half;
    if (remainingShares < half && remainingQuestions == half) {
      questionLimit = half - remainingShares + remainingQuestions;
      shareLimit = remainingShares;
    } else if (remainingShares == half && remainingQuestions < half) {
      questionLimit = remainingQuestions;
      shareLimit = half - remainingQuestions + remainingShares;
    }

    let shares = await this.shareModel
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
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
      })
      .skip(skip)
      .limit(shareLimit);
    const user = await this.userModel.findById(userId);
    shares = shares.map((share) => {
      share.isLiked = user.favoriteShare.includes(share._id);
      share.isSaved = share.saved.some((ele) => ele.user.toString() == userId);
      return share;
    });
    let questions = await this.questionModel
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
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
      })
      .skip(skip)
      .limit(questionLimit);
    questions = questions.map((question) => {
      question.isLiked = user.favoriteQuestion.includes(question._id);
      question.isSaved = question.saved.some(
        (ele) => ele.user.toString() == userId,
      );
      return question;
    });

    // Combine all the data into one array
    const combinedFeed = [
      ...shares,
      // ...voluntary,
      // ...offered,
      ...questions,
      // ...events,
    ];

    // // Sort the combined feed by 'createdAt' in descending order
    const sortedFeed = combinedFeed.sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    // Return paginated feed along with pagination details
    // const totalItems = combinedFeed.length;

    return {
      feed: sortedFeed,
      pagination: {
        limit,
        currentPage,
        previousPage,
        skip,
        count,
        numOfPages,
        // pages: Math.ceil(totalItems / limit),
      },
    };
  }
  async getOne(id: string, userId: string) {
    let postExist = await this.questionModel
      .findById(id)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
      });
    if (!postExist) {
      postExist = await this.shareModel
        .findById(id)
        .populate({
          path: 'user',
          model: 'User',
          select: 'mobile name icon',
        })
        .populate({
          path: 'country',
          select: 'image nameAr nameEn',
          model: Country.name,
        })
        .populate({
          path: 'city',
          select: 'image nameAr nameEn',
          model: City.name,
        })
        .populate({
          path: 'quarter',
          select: 'image nameAr nameEn',
          model: Quarter.name,
        });
    }
    if (!postExist) {
      throw new NotFoundException('post not found');
    }
    const user = await this.userModel.findById(userId);
    postExist.isLiked = user.favoriteQuestion.includes(postExist._id);
    postExist.isSaved = postExist.saved.some(
      (ele) => ele.user.toString() == userId,
    );
    return { post: postExist };
  }
}
