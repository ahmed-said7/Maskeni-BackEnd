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
    );
    return { status: 'verified', ...tokens };
  }
  async register(request: any) {
    const firebaseUser = await this.firebaseService.checkFirebaseToken(request);
    console.log(firebaseUser);
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
  //   async addFollow(userId: mongodbId, user: UserDoc) {
  //     const followingUser = await this.Usermodel.findById(userId);
  //     if (!followingUser) {
  //       throw new HttpException('User not found', 400);
  //     }
  //     if (followingUser.followers.includes(user._id)) {
  //       throw new HttpException('user already added ', 400);
  //     }
  //     followingUser.followers.push(user._id);
  //     await followingUser.save();
  //     return { status: 'follow sent' };
  //   }
  //   async removeFollow(userId: mongodbId, user: UserDoc) {
  //     const followingUser = await this.Usermodel.findById(userId);
  //     if (!followingUser) {
  //       throw new HttpException('User not found', 400);
  //     }
  //     if (!followingUser.followers.includes(user._id)) {
  //       throw new HttpException('you are not in user followers list', 400);
  //     }
  //     followingUser.followers = followingUser.followers.filter(
  //       (id) => id.toString() != user._id.toString(),
  //     );
  //     await followingUser.save();
  //     return { status: 'follow removed' };
  //   }
  //   async getUserFollowers(userId: mongodbId) {
  //     const followingUser =
  //       await this.Usermodel.findById(userId).populate('followers');
  //     if (!followingUser) {
  //       throw new HttpException('User not found', 400);
  //     }
  //     return { followers: followingUser.followers };
  //   }
}
