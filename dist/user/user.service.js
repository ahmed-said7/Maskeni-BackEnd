"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto = __importStar(require("crypto"));
const user_schema_1 = require("./user.schema");
const refresh_service_1 = require("../refresh/refresh.service");
const api_service_1 = require("../common/Api/api.service");
const twilio_service_1 = require("../twilio/twilio.service");
const firebase_service_1 = require("../firebase/firebase.service");
const uuid_1 = require("uuid");
const array_pagination_1 = require("../common/Api/array.pagination");
let UserService = class UserService {
    constructor(Usermodel, twilioService, refreshService, apiService, firebaseService, arrayPagination) {
        this.Usermodel = Usermodel;
        this.twilioService = twilioService;
        this.refreshService = refreshService;
        this.apiService = apiService;
        this.firebaseService = firebaseService;
        this.arrayPagination = arrayPagination;
    }
    async getAllUsers(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.Usermodel.find(), obj, {}, ['name']);
        const users = await query;
        return { users, pagination: paginationObj };
    }
    async signup(body) {
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
            throw new common_1.HttpException('user is blocked', 400);
        }
        const code = this.twilioService.resetCode();
        user.VerificationCode = this.createHash(code);
        user.verificationExpiresIn = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        return { status: 'verification sent', user, code };
    }
    async createGuest() {
        const tokens = await this.refreshService.createUserTokens((0, uuid_1.v4)(), 'guest');
        return { ...tokens };
    }
    createHash(code) {
        return crypto.createHash('sha256').update(code).digest('hex');
    }
    async verifyPhone(code) {
        const hash = this.createHash(code);
        const user = await this.Usermodel.findOne({
            VerificationCode: hash,
            verificationExpiresIn: { $gt: Date.now() },
        });
        if (!user) {
            throw new common_1.HttpException('email Verified Code expired', 400);
        }
        user.VerificationCode = undefined;
        user.verificationExpiresIn = undefined;
        await user.save();
        const tokens = await this.refreshService.createUserTokens(user._id.toString(), user.role);
        return { status: 'verified', ...tokens };
    }
    async register(request) {
        const firebaseUser = await this.firebaseService.checkFirebaseToken(request);
        if (!firebaseUser) {
            throw new common_1.HttpException('Invalid Firebase token', 401);
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
            throw new common_1.HttpException('user is blocked', 400);
        }
        const tokens = await this.refreshService.createUserTokens(user._id.toString(), user.role);
        return { status: 'verified', ...tokens };
    }
    async validateMobile(mobile) {
        const user = await this.Usermodel.findOne({ mobile });
        if (user) {
            throw new common_1.HttpException('phone already exists', 400);
        }
    }
    async validateEmail(email) {
        const user = await this.Usermodel.findOne({ email });
        if (user) {
            throw new common_1.HttpException('email already exists', 400);
        }
    }
    async updateUser(body, userId) {
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
            throw new common_1.HttpException('user not found', 400);
        }
        return { status: 'updated', user: updated };
    }
    async blockUser(userId) {
        const updated = await this.Usermodel.findByIdAndUpdate(userId, {
            isBlocked: true,
        });
        if (!updated) {
            throw new common_1.HttpException('user not found', 400);
        }
        return { status: 'blocked' };
    }
    async deleteUser(userId) {
        const deleted = await this.Usermodel.findByIdAndDelete(userId);
        if (!deleted) {
            throw new common_1.HttpException('user not found', 400);
        }
        return { status: 'deleted' };
    }
    async getUser(userId) {
        const user = await this.Usermodel.findById(userId);
        if (!user) {
            throw new common_1.HttpException('user not found', 400);
        }
        return { user };
    }
    async addFollow(userId, user) {
        const followExist = await this.Usermodel.findOne({
            _id: userId,
            'followers.user': user,
        });
        if (followExist) {
            throw new common_1.HttpException('Already following', 400);
        }
        const followingUser = await this.Usermodel.findByIdAndUpdate(userId, {
            $addToSet: { followers: { user, createdAt: new Date() } },
            $inc: { followersCount: 1 },
        });
        if (!followingUser) {
            throw new common_1.HttpException('User not found', 400);
        }
        await this.Usermodel.findByIdAndUpdate(user, {
            $addToSet: { following: { user: userId, createdAt: new Date() } },
            $inc: { followingCount: 1 },
        });
        return { status: 'follow sent' };
    }
    async removeFollow(userId, user) {
        const followExist = await this.Usermodel.findOne({
            _id: userId,
            'followers.user': user,
        });
        if (!followExist) {
            throw new common_1.HttpException('you are not follow user', 400);
        }
        const followingUser = await this.Usermodel.findByIdAndUpdate(userId, {
            $pull: { followers: { user } },
            $inc: { followersCount: -1 },
        });
        if (!followingUser) {
            throw new common_1.HttpException('User not found', 400);
        }
        await this.Usermodel.findByIdAndUpdate(user, {
            $pull: { following: { user: userId } },
            $inc: { followingCount: -1 },
        });
        return { status: 'follow removed' };
    }
    async getUserFollowers(userId, query) {
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
            model: user_schema_1.User.name,
            select: 'name icon mobile',
        });
        if (!user) {
            throw new common_1.HttpException('post not found', 400);
        }
        return {
            totalPages: user.followersCount,
            page,
            limit,
            followers: user.followers,
        };
    }
    async getUserFollwing(userId, query) {
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
            model: user_schema_1.User.name,
            select: 'name icon mobile',
        });
        if (!user) {
            throw new common_1.HttpException('post not found', 400);
        }
        return {
            totalPages: user.followingCount,
            page,
            limit,
            followers: user.following,
        };
    }
    async getUserSavedShare(userId, query) {
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
    async getUserSavedQuestion(userId, query) {
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
    async getUserSavedVoluntary(userId, query) {
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
    async getUserSavedGroupPosts(userId, query) {
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
    async getUserSavedEvent(userId, query) {
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
    async getUserSavedService(userId, query) {
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
    async getUserRequestedService(userId, query) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        twilio_service_1.TwilioService,
        refresh_service_1.RefreshService,
        api_service_1.ApiService,
        firebase_service_1.FirebaseService,
        array_pagination_1.ArrayPagination])
], UserService);
//# sourceMappingURL=user.service.js.map