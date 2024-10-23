import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { User, UserDocument } from './user.schema';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { RefreshService } from 'src/refresh/refresh.service';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 } from 'uuid';
import { QuarterService } from 'src/quarter/quarter.service';
import { All_Role } from 'src/common/enum';
import { Feed } from 'src/feed/feed.schema';
import { City } from 'src/city/city.schema';
import { Quarter } from 'src/quarter/quarter.schema';
import { Country } from 'src/country/country.schema';
import { Offered } from 'src/service/offered-service.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private Usermodel: Model<UserDocument>,
    private twilioService: TwilioService,
    private refreshService: RefreshService,
    private apiService: ApiService<UserDocument, FindQuery>,
    private firebaseService: FirebaseService,
    private quarterService: QuarterService,
  ) {}
  async getAllUsers(obj: FindQuery) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.Usermodel.find(),
      obj,
      {},
      ['name'],
    );
    const users = await query;
    return { users, pagination: paginationObj };
  }
  async signup(body: LoginUserDto) {
    let user = await this.Usermodel.findOne({
      mobile: body.mobile,
      provider: 'system',
    });
    if (!user) {
      user = await this.Usermodel.create({
        mobile: body.mobile,
        provider: 'system',
      });
    }
    if (user.isBlocked) {
      throw new HttpException('user is blocked', 400);
    }
    const code = this.twilioService.resetCode();
    user.VerificationCode = this.createHash(code);
    user.verificationExpiresIn = new Date(Date.now() + 5 * 60 * 1000);
    // try {
    // send mobile verification
    // }
    await user.save();
    return { status: 'verification sent', user, code };
  }
  async createGuest() {
    const tokens = await this.refreshService.createUserTokens(v4(), 'guest');
    return { ...tokens };
  }
  private createHash(code: string) {
    return crypto.createHash('sha256').update(code).digest('hex');
  }

  async verifyPhone(code: string) {
    const hash = this.createHash(code);
    const user = await this.Usermodel.findOne({
      VerificationCode: hash,
      verificationExpiresIn: { $gt: Date.now() },
    });
    if (!user) {
      throw new HttpException('email Verified Code expired', 400);
    }
    user.VerificationCode = undefined;
    user.verificationExpiresIn = undefined;
    await user.save();
    const tokens = await this.refreshService.createUserTokens(
      user._id.toString(),
      user.role,
    );
    return { status: 'verified', ...tokens };
  }
  async updateQuarter(userId: string, body: [number, number]) {
    const { country, city, quarter } =
      await this.quarterService.findQuarterContainingPoint(body);
    const tokens = await this.refreshService.createUserTokens(
      userId,
      All_Role.User,
      quarter._id.toString(),
      city._id.toString(),
      country._id.toString(),
    );
    return { status: 'quarter updated', ...tokens, city, country, quarter };
  }
  async register(request: any) {
    const firebaseUser = await this.firebaseService.checkFirebaseToken(request);
    if (!firebaseUser) {
      throw new HttpException('Invalid Firebase token', 401);
    }
    let user = await this.Usermodel.findOne({ uid: firebaseUser.uid });
    if (!user) {
      user = await this.Usermodel.create({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        provider: firebaseUser.provider,
      });
    }
    if (user.isBlocked) {
      throw new HttpException('user is blocked', 400);
    }
    const tokens = await this.refreshService.createUserTokens(
      user._id.toString(),
      user.role,
    );
    return { status: 'verified', ...tokens };
  }
  private async validateMobile(mobile: string) {
    const user = await this.Usermodel.findOne({ mobile });
    if (user) {
      throw new HttpException('phone already exists', 400);
    }
  }
  private async validateEmail(email: string) {
    const user = await this.Usermodel.findOne({ email });
    if (user) {
      throw new HttpException('email already exists', 400);
    }
  }
  async updateUser(body: UpdateUserDto, userId: string) {
    if (body.mobile) {
      await this.validateMobile(body.mobile);
    }
    if (body.email) {
      await this.validateEmail(body.email);
    }
    const updated = await this.Usermodel.findByIdAndUpdate(userId, body, {
      new: true,
    }).select('-password');
    if (!updated) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'updated', user: updated };
  }
  async blockUser(userId: string) {
    const updated = await this.Usermodel.findByIdAndUpdate(userId, {
      isBlocked: true,
    }).select('-password');
    if (!updated) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'blocked' };
  }
  async deleteUser(userId: string) {
    const deleted = await this.Usermodel.findByIdAndUpdate(userId, {
      isDeleted: true,
    });
    if (!deleted) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'deleted' };
  }
  async getUser(userId: string) {
    const user = await this.Usermodel.findById(userId).select('-password');
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    user.followers = undefined;
    user.following = undefined;
    user.savedEvent = undefined;
    user.savedGroupPost = undefined;
    user.savedQuestion = undefined;
    user.savedFeed = undefined;
    user.savedEvent = undefined;
    user.savedVoluntary = undefined;
    user.requestedService = undefined;
    user.savedService = undefined;
    return { user };
  }
  async addFollow(userId: string, user: string) {
    const followExist = await this.Usermodel.findOne({
      _id: userId,
      'followers.user': user,
    });
    if (followExist) {
      throw new HttpException('Already following', 400);
    }
    const followingUser = await this.Usermodel.findByIdAndUpdate(userId, {
      $addToSet: { followers: { user, createdAt: new Date() } },
      $inc: { followersCount: 1 },
    });
    if (!followingUser) {
      throw new HttpException('User not found', 400);
    }
    await this.Usermodel.findByIdAndUpdate(user, {
      $addToSet: { following: { user: userId, createdAt: new Date() } },
      $inc: { followingCount: 1 },
    });
    return { status: 'follow sent' };
  }
  async removeFollow(userId: string, user: string) {
    const followExist = await this.Usermodel.findOne({
      _id: userId,
      'followers.user': user,
    });
    if (!followExist) {
      throw new HttpException('you are not follow user', 400);
    }
    const followingUser = await this.Usermodel.findByIdAndUpdate(userId, {
      $pull: { followers: { user } },
      $inc: { followersCount: -1 },
    });
    if (!followingUser) {
      throw new HttpException('User not found', 400);
    }
    await this.Usermodel.findByIdAndUpdate(user, {
      $pull: { following: { user: userId } },
      $inc: { followingCount: -1 },
    });
    return { status: 'follow removed' };
  }
  async getUserFollowers(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        followers: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'followers.user',
        model: User.name,
        select: 'name icon mobile',
      });
    if (!user) {
      throw new HttpException('post not found', 400);
    }
    // const result = (await this.Usermodel.findById(userId))?.requestedService;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      user.followersCount,
    );
    return {
      pagination,
      followers: user.followers,
    };
  }
  async getUserFollwing(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        following: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'following.user',
        model: User.name,
        select: 'name icon mobile',
      });
    if (!user) {
      throw new HttpException('post not found', 400);
    }
    const pagination = this.apiService.makePagination(
      page,
      limit,
      user.followingCount,
    );
    return {
      // totalPages: user.followingCount,
      pagination,
      followers: user.following,
    };
  }
  async getUserSavedFeed(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        savedShare: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'savedFeed.feed',
        model: Feed.name,
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.savedFeed;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    const saved = user.savedFeed.map((ele) => {
      // @ts-ignore
      ele.feed.savedAt = ele.createdAt;
      return ele.feed;
    });
    return {
      pagination,
      savedFeed: saved,
    };
  }
  async getUserSavedVoluntary(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        savedVoluntary: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'savedVoluntary.voluntary',
        model: 'Voluntary',
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.savedVoluntary;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    const saved = user.savedVoluntary.map((ele) => {
      // @ts-ignore
      ele.voluntary.savedAt = ele.createdAt;
      return ele.voluntary;
    });
    return {
      pagination,
      savedVoluntary: saved,
    };
  }
  async getUserSavedGroupPosts(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        savedGroupPost: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'savedGroupPost.post',
        model: 'Post',
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.savedGroupPost;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    const saved = user.savedGroupPost.map((ele) => {
      // @ts-ignore
      ele.post.savedAt = ele.createdAt;
      return ele.post;
    });
    return {
      pagination,
      savedVoluntary: saved,
    };
  }
  async getUserSavedEvent(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        savedEvent: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'savedEvent.event',
        model: 'Event',
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.savedEvent;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    const saved = user.savedEvent.map((ele) => {
      // @ts-ignore
      ele.event.savedAt = ele.createdAt;
      return ele.event;
    });
    return {
      pagination,
      savedEvent: saved,
    };
  }
  async getUserSavedService(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        savedService: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'savedService.service',
        model: Offered.name,
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.savedService;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    const saved = user.savedService.map((ele) => {
      // @ts-ignore
      ele.service.savedAt = ele.createdAt;
      return ele.service;
    });
    return {
      pagination,
      savedService: saved,
    };
  }
  async getUserRequestedService(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        requestedService: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'requestedService.service',
        model: Offered.name,
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.requestedService;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    const saved = user.requestedService.map((ele) => {
      // @ts-ignore
      ele.service.savedAt = ele.createdAt;
      return ele.service;
    });
    return {
      pagination,
      requestedService: user.requestedService,
    };
  }
  async getUserFavoriteFeed(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        favoriteFeed: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'favoriteFeed',
        model: Feed.name,
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.favoriteFeed;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    return {
      pagination,
      favoriteFeed: user.favoriteFeed,
    };
  }
  async getUserFavoriteVoluntary(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        favoriteVoluntary: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'favoriteVoluntary',
        model: 'Voluntary',
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.favoriteVoluntary;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    return {
      pagination,
      favoriteVoluntary: user.favoriteVoluntary,
    };
  }
  async getUserFavoriteGroupPosts(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        favoriteGroupPost: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'favoriteGroupPost',
        model: 'Post',
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.favoriteGroupPost;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    return {
      pagination,
      favoriteVoluntary: user.favoriteVoluntary,
    };
  }
  async getUserFavoriteEvent(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        favoriteEvent: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'favoriteEvent',
        model: 'Event',
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ]
      });
    const result = (await this.Usermodel.findById(userId))?.favoriteEvent;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    return {
      pagination,
      favoriteEvent: user.favoriteEvent,
    };
  }
  async getUserFavoriteService(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        favoriteService: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'favoriteService',
        model: Offered.name,
        populate: [
          {
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
          },
          {
            path: 'quarter',
            select: 'image nameAr nameEn',
            model: Quarter.name,
          },
          {
            path: 'city',
            select: 'image nameAr nameEn',
            model: City.name,
          },
          {
            path: 'country',
            select: 'image nameAr nameEn',
            model: Country.name,
          },
        ],
      });
    const result = (await this.Usermodel.findById(userId))?.favoriteService;
    const pagination = this.apiService.makePagination(
      page,
      limit,
      result.length,
    );
    return {
      pagination,
      favoriteService: user.favoriteService,
    };
  }
}
