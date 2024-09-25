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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcryptjs = __importStar(require("bcrypt"));
const admin_schema_1 = require("./admin.schema");
const api_service_1 = require("../common/Api/api.service");
const config_1 = require("@nestjs/config");
const enum_1 = require("../common/enum");
const refresh_service_1 = require("../refresh/refresh.service");
const quarter_service_1 = require("../quarter/quarter.service");
let AdminService = class AdminService {
    constructor(AdminModel, refreshService, apiService, config, quarterService) {
        this.AdminModel = AdminModel;
        this.refreshService = refreshService;
        this.apiService = apiService;
        this.quarterService = quarterService;
        this.AdminModel.findOne({
            mobile: config.get('mobile'),
        }).then((admin) => {
            console.log(admin);
            if (!admin) {
                this.AdminModel.create({
                    mobile: config.get('mobile'),
                    password: bcryptjs.hashSync(config.get('password'), 10),
                    role: enum_1.Admin_Role.SuperAdmin,
                    name: config.get('name'),
                }).then(() => {
                    console.log('admin created');
                });
            }
        });
    }
    async getAllAdmins(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.AdminModel.find(), obj, {}, ['name']);
        const admins = await query;
        return { admins, pagination: paginationObj };
    }
    async updateQuarter(userId, role, body) {
        const { country, city, quarter } = await this.quarterService.findQuarterContainingPoint(body);
        const tokens = await this.refreshService.createUserTokens(userId, role, quarter._id.toString(), city._id.toString(), country._id.toString());
        return { status: 'quarter updated', ...tokens, city, country, quarter };
    }
    async login(body) {
        const user = await this.AdminModel.findOne({ mobile: body.mobile });
        if (!user) {
            throw new common_1.HttpException('user not found', 400);
        }
        const valid = await bcryptjs.compare(body.password, user.password);
        if (!valid) {
            throw new common_1.HttpException('password or email is not correct', 400);
        }
        const token = await this.refreshService.createAdminTokens(user._id.toString(), user.role);
        return { ...token, user };
    }
    async updatepassword(body, userId) {
        const user = await this.AdminModel.findById(userId);
        const valid = await bcryptjs.compare(body.currentPassword, user.password);
        if (!valid) {
            throw new common_1.HttpException('current password is not correct', 400);
        }
        user.password = body.password;
        user.passwordChangedAt = new Date();
        await user.save();
        return { admin: user, status: 'password has been updated' };
    }
    async signup(body) {
        await this.validateMobile(body.mobile);
        body.password = await bcryptjs.hash(body.password, 10);
        const user = await this.AdminModel.create(body);
        return { admin: user };
    }
    async validateMobile(mobile) {
        const user = await this.AdminModel.findOne({ mobile });
        if (user) {
            throw new common_1.HttpException('email already exists', 400);
        }
    }
    async updateUser(body, userId) {
        if (body.mobile) {
            await this.validateMobile(body.mobile);
        }
        const updated = await this.AdminModel.findByIdAndUpdate(userId, body, {
            new: true,
        });
        return { status: 'updated', admin: updated };
    }
    async deleteUser(userId) {
        const deleted = await this.AdminModel.findByIdAndDelete(userId);
        if (!deleted) {
            throw new common_1.HttpException('user not found', 400);
        }
        return { status: 'deleted' };
    }
    async getUser(userId) {
        const admin = await this.AdminModel.findById(userId);
        if (!admin) {
            throw new common_1.HttpException('admin not found', 400);
        }
        return { admin };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        refresh_service_1.RefreshService,
        api_service_1.ApiService,
        config_1.ConfigService,
        quarter_service_1.QuarterService])
], AdminService);
//# sourceMappingURL=admin.service.js.map