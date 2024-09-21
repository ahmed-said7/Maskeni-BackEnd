"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const api_module_1 = require("../common/Api/api.module");
const user_schema_1 = require("../user/user.schema");
const event_schema_1 = require("./event.schema");
const ticket_schema_1 = require("../ticket/ticket.schema");
const event_service_1 = require("./event.service");
const event_controller_1 = require("./event.controller");
const reaction_module_1 = require("../reaction/reaction.module");
const admin_schema_1 = require("../admin/admin.schema");
const comment_schema_1 = require("../comment/comment.schema");
const likes_schema_1 = require("../likes/likes.schema");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            reaction_module_1.ReactionModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Likes', schema: likes_schema_1.LikesSchema },
                { name: 'Comment', schema: comment_schema_1.CommentSchema },
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: admin_schema_1.Admin.name,
                    schema: admin_schema_1.AdminSchema,
                },
                {
                    name: Event.name,
                    schema: event_schema_1.EventSchema,
                },
                {
                    name: ticket_schema_1.Ticket.name,
                    schema: ticket_schema_1.TicketSchema,
                },
            ]),
        ],
        providers: [event_service_1.EventService],
        controllers: [event_controller_1.EventController],
    })
], EventModule);
//# sourceMappingURL=event.module.js.map