import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcrypt';
import { Admin, AdminDocument } from './admin.schema';
import { LoginAdminDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { ApiService } from 'src/common/Api/api.service';
import { FindQuery } from 'src/common/types';
import { SignupAdminDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { Admin_Role } from 'src/common/enum';
import { RefreshService } from 'src/refresh/refresh.service';
import { QuarterService } from 'src/quarter/quarter.service';
import { UpdateAdminDto } from './dto/update.user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<AdminDocument>,
    private refreshService: RefreshService,
    private apiService: ApiService<AdminDocument, FindQuery>,
    config: ConfigService,
    private quarterService: QuarterService,
  ) {
    this.AdminModel.findOne({
      mobile: config.get('mobile'),
    }).then((admin) => {
      // console.log(admin);
      if (!admin) {
        this.AdminModel.create({
          mobile: config.get('mobile'),
          password: bcryptjs.hashSync(config.get('password'), 10),
          role: Admin_Role.SuperAdmin,
          name: config.get('name'),
        }).then(() => {
          console.log('admin created');
        });
      }
    });
  }
  async getAllAdmins(obj: FindQuery) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.AdminModel.find(),
      obj,
      {},
      ['name'],
    );
    const admins = await query.select('-password');
    return { admins, pagination: paginationObj };
  }
  async updateQuarter(userId: string, role: string, body: [number, number]) {
    const { country, city, quarter } =
      await this.quarterService.findQuarterContainingPoint(body);
    const tokens = await this.refreshService.createUserTokens(
      userId,
      role,
      quarter._id.toString(),
      city._id.toString(),
      country._id.toString(),
    );
    return { status: 'quarter updated', ...tokens, city, country, quarter };
  }
  async login(body: LoginAdminDto) {
    const user = await this.AdminModel.findOne({ mobile: body.mobile });
    if (!user) {
      throw new HttpException('user not found', 400);
    }
    const valid = await bcryptjs.compare(body.password, user.password);
    if (!valid) {
      throw new HttpException('password or email is not correct', 400);
    }
    const token = await this.refreshService.createAdminTokens(
      user._id.toString(),
      user.role,
    );
    return { ...token, user };
  }
  async updatepassword(body: UpdatePasswordDto, userId: string) {
    const user = await this.AdminModel.findById(userId);
    const valid = await bcryptjs.compare(body.currentPassword, user.password);
    if (!valid) {
      throw new HttpException('current password is not correct', 400);
    }
    user.password = await bcryptjs.hash(body.password, 10);
    user.passwordChangedAt = new Date();
    await user.save();
    return { admin: user, status: 'password has been updated' };
  }
  async signup(body: SignupAdminDto) {
    await this.validateMobile(body.mobile);
    body.password = await bcryptjs.hash(body.password, 10);
    const user = await this.AdminModel.create(body);
    // send verification code
    return { admin: user };
  }
  private async validateMobile(mobile: string) {
    const user = await this.AdminModel.findOne({ mobile });
    if (user) {
      throw new HttpException('email already exists', 400);
    }
  }
  async updateUser(body: UpdateAdminDto, userId: string) {
    if (body.mobile) {
      await this.validateMobile(body.mobile);
    }
    const updated = await this.AdminModel.findByIdAndUpdate(userId, body, {
      new: true,
    }).select('-password');
    return { status: 'updated', admin: updated };
  }
  async deleteUser(userId: string) {
    const deleted = await this.AdminModel.findByIdAndUpdate(userId, {
      isDeleted: true,
    });
    if (!deleted) {
      throw new HttpException('user not found', 400);
    }
    return { status: 'deleted' };
  }
  async getUser(userId: string) {
    const admin = await this.AdminModel.findById(userId).select('-password');
    if (!admin) {
      throw new HttpException('admin not found', 400);
    }
    return { admin };
  }
}
