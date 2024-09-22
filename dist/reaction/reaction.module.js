'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReactionModule = void 0;
const common_1 = require('@nestjs/common');
const reaction_service_1 = require('./reaction.service');
const api_module_1 = require('../common/Api/api.module');
const comment_module_1 = require('../comment/comment.module');
const likes_module_1 = require('../likes/likes.module');
const likes_schema_1 = require('../likes/likes.schema');
const comment_schema_1 = require('../comment/comment.schema');
const mongoose_1 = require('@nestjs/mongoose');
let ReactionModule = class ReactionModule {};
exports.ReactionModule = ReactionModule;
exports.ReactionModule = ReactionModule = __decorate(
  [
    (0, common_1.Module)({
      exports: [reaction_service_1.ReactionService],
      providers: [reaction_service_1.ReactionService],
      imports: [
        api_module_1.ApiModule,
        comment_module_1.CommentModule,
        likes_module_1.LikesModule,
        mongoose_1.MongooseModule.forFeature([
          { name: 'Likes', schema: likes_schema_1.LikesSchema },
          { name: 'Comment', schema: comment_schema_1.CommentSchema },
        ]),
      ],
    }),
  ],
  ReactionModule,
);
//# sourceMappingURL=reaction.module.js.map
