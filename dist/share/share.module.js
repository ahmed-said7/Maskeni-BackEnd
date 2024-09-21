"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_module_1 = require("../common/Api/api.module");
const user_schema_1 = require("../user/user.schema");
const reaction_module_1 = require("../reaction/reaction.module");
const share_schema_1 = require("./share.schema");
const share_service_1 = require("./share.service");
const share_controller_1 = require("./share.controller");
let ShareModule = class ShareModule {
};
exports.ShareModule = ShareModule;
exports.ShareModule = ShareModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            reaction_module_1.ReactionModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: share_schema_1.Share.name,
                    schema: share_schema_1.ShareSchema,
                },
            ]),
        ],
        providers: [share_service_1.ShareService],
        controllers: [share_controller_1.ShareController],
    })
], ShareModule);
//# sourceMappingURL=share.module.js.map