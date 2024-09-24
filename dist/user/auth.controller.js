"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const login_dto_1 = require("./dto/login.dto");
let UserAuthController = class UserAuthController {
    constructor(userService) {
        this.userService = userService;
    }
    loginUsingMobile(body) {
        return this.userService.signup(body);
    }
    loginFirebase(req) {
        return this.userService.register(req);
    }
    verifyCode(code) {
        return this.userService.verifyPhone(code);
    }
    loginAsGuest() {
        return this.userService.createGuest();
    }
};
exports.UserAuthController = UserAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login using mobile number' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "loginUsingMobile", null);
__decorate([
    (0, common_1.Post)('firebase'),
    (0, swagger_1.ApiOperation)({ summary: 'Login using Firebase authentication' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "loginFirebase", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify phone code for authentication' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "verifyCode", null);
__decorate([
    (0, common_1.Post)('guest'),
    (0, swagger_1.ApiOperation)({ summary: 'Login as a guest user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "loginAsGuest", null);
exports.UserAuthController = UserAuthController = __decorate([
    (0, swagger_1.ApiTags)('User Authentication'),
    (0, common_1.Controller)('user/auth/'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserAuthController);
//# sourceMappingURL=auth.controller.js.map