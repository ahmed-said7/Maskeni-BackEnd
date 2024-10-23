import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { User, UserDocument } from 'src/user/user.schema';
import { Feed, FeedDocument } from './feed.schema';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { Quarter } from 'src/quarter/quarter.schema';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';
import { QueryFeedDto } from './dto/query.feed.dto';
import { UpdateFeedDto } from './dto/update.feed.dto';
import { CreateFeedDto } from './dto/create.feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(Feed.name) private postModel: Model<FeedDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<FeedDocument>,
    private apiService: ApiService<FeedDocument, FindQuery>,
  ) {
    this.reactionService.setModel(postModel);
  }
  async create(body: CreateFeedDto, user: string) {
    body.user = user;
    const post = await this.postModel.create(body);
    return post;
  }
  async updateOne(postId: string, body: UpdateFeedDto, user: string) {
    const postExist = await this.postModel.findById(postId);
    if (!postExist) {
      throw new HttpException('share not found', 400);
    }
    if (postExist.user.toString() != user) {
      throw new HttpException('you are not allowed to update share', 400);
    }
    const post = await this.postModel.findByIdAndUpdate(postId, body, {
      new: true,
    });
    return { post };
  }
  async deleteOne(shareId: string, user: string) {
    const postExist = await this.postModel.findById(shareId);
    if (!postExist) {
      throw new HttpException('share not found', 400);
    }
    if (postExist.user.toString() != user) {
      throw new HttpException('you are not allowed to delete share', 400);
    }
    postExist.isDeleted = true;
    await postExist.save();
    return { status: 'deleted' };
  }
  async getOne(postId: string, userId: string) {
    const postExist = await this.postModel
      .findById(postId)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      // .populate({
      //   path: 'comments',
      //   select: '-likes -comments -replies',
      //   populate: { path: 'user', select: 'name mobile icon', model: 'User' },
      //   options: { limit: 1 }, // Only load the first few replies (can increase limit)
      // })
      // .populate({
      //   path: 'likes',
      //   populate: { path: 'user', select: 'name mobile icon', model: 'User' },
      //   options: { limit: 1 }, // Only load the first few replies (can increase limit)
      // })
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
      throw new HttpException('share not found', 400);
    }
    const user = await this.userModel.findById(userId);
    postExist.isLiked = user.favoriteVoluntary.includes(postExist._id);
    postExist.isSaved = postExist.saved.some(
      (ele) => ele.user.toString() == userId,
    );
    return { post: postExist };
  }
  async getAll(obj: QueryFeedDto, userId: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
    );
    let posts = await query
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
      });
    const user = await this.userModel.findById(userId);
    posts = posts.map((share) => {
      share.isLiked = user.favoriteFeed.includes(share._id);
      share.isSaved = share.saved.some((ele) => ele.user.toString() == userId);
      return share;
    });
    return { posts, pagination: paginationObj };
  }
  async addLike(postId: string, user: string) {
    const result = await this.reactionService.createLike(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { favoriteFeed: postId },
    });
    return result;
  }
  async removeLike(postId: string, user: string) {
    const result = await this.reactionService.deleteLike(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { favoriteFeed: postId },
    });
    return result;
  }
  async getLikes(postId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(postId, query);
  }
  async addComment(body: CreateCommentDto, postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    body.post = postId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId: string, user: string) {
    return this.reactionService.deleteComment(commentId, user);
  }
  async getComments(shareId: string, query: FindQuery) {
    return this.reactionService.getAllComments(query, shareId);
  }
  async addSaved(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const result = await this.reactionService.createSaved(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedFeed: { feed: postId, createdAt: new Date() } },
    });
    return result;
  }
  async deleteSaved(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const result = await this.reactionService.deleteSaved(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedFeed: { feed: postId } },
    });
    return result;
  }
  async getAllSaved(postId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, postId);
  }
  async getMyArcived(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      { isArchived: true, user },
    );
    const posts = await query
      .setOptions({ skipFilter: true })
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
    return { posts, pagination: paginationObj };
  }
  async getMyDeletd(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      { isDeleted: true, user },
    );
    const posts = await query
      .setOptions({ skipFilter: true })
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
    return { posts, pagination: paginationObj };
  }
}
