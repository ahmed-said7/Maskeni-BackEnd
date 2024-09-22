"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const likes_service_1 = require("./likes.service");
const likes_schema_1 = require("./likes.schema");
const api_module_1 = require("../common/Api/api.module");
const comment_schema_1 = require("../comment/comment.schema");
const admin_schema_1 = require("../admin/admin.schema");
const user_schema_1 = require("../user/user.schema");
const likes_controller_1 = require("./likes.controller");
let LikesModule = class LikesModule {
};
exports.LikesModule = LikesModule;
exports.LikesModule = LikesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Likes', schema: likes_schema_1.LikesSchema },
                { name: 'Comment', schema: comment_schema_1.CommentSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: admin_schema_1.Admin.name, schema: admin_schema_1.AdminSchema },
            ]),
        ],
        providers: [likes_service_1.LikesService],
        exports: [likes_service_1.LikesService],
        controllers: [likes_controller_1.LikesController],
    })
], LikesModule);
//# sourceMappingURL=likes.module.js.map