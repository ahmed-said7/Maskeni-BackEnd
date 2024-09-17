import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { User, UserDocument } from './user.schema';
import { SignupUserDto } from './dto/signup.dto';
import { MessagingService } from 'src/messaging/messaging.service';
import { LoginUserDto } from './dto/login.dto';
import {
  changePasswordDto,
  UpdatePasswordDto,
} from './dto/update.password.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthService } from 'src/refresh/auth.service';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';

@Injectable()
export class UserService {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private Usermodel: Model<UserDocument>,
    private messagingService: MessagingService,
    private authService: AuthService,
    private apiService: ApiService<UserDocument, FindQuery>,
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
  async signup(body: SignupUserDto) {
    await this.validateMobile(body.mobile);
    body.password = await bcryptjs.hash(body.password, 10);
    const user = await this.Usermodel.create(body);
    // send verification code
    return { user };
  }
  async sendVerification(id: string) {
    const user = await this.Usermodel.findOne({
      _id: id,
      mobileVerified: false,
    });
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    const code = this.messagingService.resetCode();
    user.VerificationCode = this.createHash(code);
    user.verificationExpiresIn = new Date(Date.now() + 5 * 60 * 1000);
    // try {
    // send mobile verification
    // }
    await user.save();
    return { status: 'verification sent' };
  }
  private createHash(code: string) {
    return crypto.createHash('sha256').update(code).digest('hex');
  }

  async verifyEmail(code: string) {
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
    user.mobileVerified = true;
    await user.save();
    return { status: 'verified' };
  }
  async login(body: LoginUserDto) {
    const user = await this.Usermodel.findOne({ email: body.mobile });
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    if (!user.mobileVerified) {
      throw new HttpException('user not verified', 400);
    }
    const valid = await bcryptjs.compare(body.password, user.password);
    if (!valid) {
      throw new HttpException('password or email is not correct', 400);
    }
    const token = this.authService.createUserTokens(
      user._id.toString(),
      user.role,
    );
    return { ...token, user };
  }
  async updatepassword(body: UpdatePasswordDto, userId: string) {
    const user = await this.Usermodel.findById(userId);
    const valid = await bcryptjs.compare(body.currentPassword, user.password);
    if (!valid) {
      throw new HttpException('current password is not correct', 400);
    }
    user.password = body.password;
    user.passwordChangedAt = new Date();
    await user.save();
    return { user, status: 'password has been updated' };
  }
  private async validateMobile(mobile: string) {
    const user = await this.Usermodel.findOne({ mobile });
    if (user) {
      throw new HttpException('email already exists', 400);
    }
  }
  async updateUser(body: UpdateUserDto, userId: string) {
    if (body.mobile) {
      await this.validateMobile(body.mobile);
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
  async forgetPassword(mobile: string) {
    const user = await this.Usermodel.findOne({ mobile });
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    const resetCode = this.messagingService.resetCode();
    user.passwordResetCode = this.createHash(resetCode);
    user.passwordResetCodeExpiresIn = new Date(Date.now() + 4 * 60 * 1000);
    await user.save();
    // try {
    //   //send code to mobile
    // } catch (e) {
    //   console.log(e);
    //   user.passwordResetCode = undefined;
    //   user.passwordResetCodeExpiresIn = undefined;
    //   await user.save();
    //   throw new HttpException('error in sending message', 400);
    // }
    return { resetCode, status: 'code sent' };
  }

  async verifyResetCode(resetCode: string) {
    const hash = this.createHash(resetCode);
    const user = await this.Usermodel.findOne({
      passwordResetCode: hash,
      passwordResetCodeExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    user.passwordResetCode = undefined;
    user.passwordResetCodeExpiresIn = undefined;
    user.passwordResetCodeVerified = true;
    await user.save();
    return { status: 'verified' };
  }

  async changePassword(body: changePasswordDto) {
    const user = await this.Usermodel.findOne({ mobile: body.mobile });
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    if (!user.passwordResetCodeVerified) {
      throw new HttpException('resetcode is not vertified', 400);
    }
    user.passwordResetCodeVerified = null;
    user.password = body.password;
    user.passwordChangedAt = new Date();
    await user.save();
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
