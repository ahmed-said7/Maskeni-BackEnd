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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PostController = void 0;
const common_1 = require('@nestjs/common');
const post_service_1 = require('./post.service');
const post_create_dto_1 = require('./dto/post.create.dto');
const post_update_dto_1 = require('./dto/post.update.dto');
const validate_mongo_pipe_1 = require('../common/pipe/validate.mongo.pipe');
const types_1 = require('../common/types');
const create_comment_dto_1 = require('../comment/dto/create.comment.dto');
let PostController = class PostController {
  constructor(postService) {
    this.postService = postService;
  }
  getPostComments(req, postId, query) {
    return this.postService.getComments(postId, req.userId, query);
  }
  addPostComment(body, req, postId) {
    return this.postService.addComment(body, postId, req.userId);
  }
  deletePostComment(req, commentId) {
    return this.postService.removeComment(commentId, req.userId);
  }
  addLike(req, postId) {
    return this.postService.addLike(postId, req.userId);
  }
  removeLike(req, postId) {
    return this.postService.removeLike(postId, req.userId);
  }
  getLike(req, postId, query) {
    return this.postService.getLikes(postId, req.userId, query);
  }
  createPost(req, body) {
    return this.postService.createPost(body, req.userId);
  }
  getGroupPosts(req, groupId, query) {
    return this.postService.getGroupPosts(groupId, req.userId, query);
  }
  deletePost(req, postId) {
    return this.postService.deletePost(postId, req.userId);
  }
  updatePost(req, postId, body) {
    return this.postService.updatePost(body, postId, req.userId);
  }
};
exports.PostController = PostController;
__decorate(
  [
    (0, common_1.Get)('comment/:id'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __param(2, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'getPostComments',
  null,
);
__decorate(
  [
    (0, common_1.Post)('comment/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(
      2,
      (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      create_comment_dto_1.CreateCommentDto,
      Object,
      String,
    ]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'addPostComment',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('comment/:commentId'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)(
        'commentId',
        validate_mongo_pipe_1.ValidateObjectIdPipe,
      ),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'deletePostComment',
  null,
);
__decorate(
  [
    (0, common_1.Post)('likes/:postId'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('postId', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'addLike',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('likes/:postId'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('postId', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'removeLike',
  null,
);
__decorate(
  [
    (0, common_1.Get)('likes/:postId'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('postId', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __param(2, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'getLike',
  null,
);
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, post_create_dto_1.CreatePostDto]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'createPost',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __param(2, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String, types_1.FindQuery]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'getGroupPosts',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, String]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'deletePost',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(
      1,
      (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe),
    ),
    __param(2, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      Object,
      String,
      post_update_dto_1.UpdatePostDto,
    ]),
    __metadata('design:returntype', void 0),
  ],
  PostController.prototype,
  'updatePost',
  null,
);
exports.PostController = PostController = __decorate(
  [
    (0, common_1.Controller)('post'),
    __metadata('design:paramtypes', [post_service_1.PostService]),
  ],
  PostController,
);
//# sourceMappingURL=post.controller.js.map
