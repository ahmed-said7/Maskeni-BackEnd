"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const reaction_module_1 = require("../reaction/reaction.module");
const api_module_1 = require("../common/Api/api.module");
const post_schema_1 = require("./post.schema");
const user_schema_1 = require("../user/user.schema");
const group_schema_1 = require("../group/group.schema");
const admin_schema_1 = require("../admin/admin.schema");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: post_schema_1.Post.name,
                    schema: post_schema_1.PostSchema,
                },
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: group_schema_1.Group.name,
                    schema: group_schema_1.GroupSchema,
                },
                {
                    name: admin_schema_1.Admin.name,
                    schema: admin_schema_1.AdminSchema,
                },
            ]),
        ],
        providers: [post_service_1.PostService, reaction_module_1.ReactionModule, api_module_1.ApiModule],
        controllers: [post_controller_1.PostController],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map