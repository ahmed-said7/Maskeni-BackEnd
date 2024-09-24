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
import { UpdateAddressDto } from 'src/address/dto/update.address.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private Usermodel: Model<UserDocument>,
    private twilioService: TwilioService,
    private refreshService: RefreshService,
    private apiService: ApiService<UserDocument, FindQuery>,
    private firebaseService: FirebaseService,
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
      user.quarter.toString(),
    );
    return { status: 'verified', ...tokens };
  }
  async updateQuarter(id: string, body: UpdateAddressDto) {
    const user = await this.Usermodel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    const tokens = await this.refreshService.createUserTokens(
      user._id.toString(),
      user.role,
      user.quarter.toString(),
    );
    return { status: 'quarter updated', ...tokens };
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
      user.quarter.toString(),
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
    });
    if (!updated) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'updated', user: updated };
  }
  async blockUser(userId: string) {
    const updated = await this.Usermodel.findByIdAndUpdate(userId, {
      isBlocked: true,
    });
    if (!updated) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'blocked' };
  }
  async deleteUser(userId: string) {
    const deleted = await this.Usermodel.findByIdAndDelete(userId);
    if (!deleted) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'deleted' };
  }
  async getUser(userId: string) {
    const user = await this.Usermodel.findById(userId);
    if (!user) {
      throw new HttpException('user not found', 400);
    }
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
    return {
      totalPages: user.followersCount,
      page,
      limit,
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
    return {
      totalPages: user.followingCount,
      page,
      limit,
      followers: user.following,
    };
  }
  async getUserSavedShare(userId: string, query: FindQuery) {
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
        path: 'savedShare.share',
      });
    return {
      page,
      limit,
      savedShare: user.savedShare,
    };
  }
  async getUserSavedQuestion(userId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const user = await this.Usermodel.findById(userId)
      .select({
        savedQuestion: {
          $slice: [skip, limit],
        },
      })
      .populate({
        path: 'savedQuestion.question',
      });
    return {
      page,
      limit,
      savedQuestion: user.savedQuestion,
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
      });
    return {
      page,
      limit,
      savedVoluntary: user.savedVoluntary,
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
      });
    return {
      page,
      limit,
      savedVoluntary: user.savedVoluntary,
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
      });
    return {
      page,
      limit,
      savedEvent: user.savedEvent,
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
      });
    return {
      page,
      limit,
      savedService: user.savedService,
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
      });
    return {
      page,
      limit,
      requestedService: user.requestedService,
    };
  }
}
