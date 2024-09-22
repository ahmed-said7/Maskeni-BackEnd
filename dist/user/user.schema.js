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
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const enum_1 = require('../common/enum');
const post_schema_1 = require('../post/post.schema');
const question_schema_1 = require('../question/question.schema');
const offered_service_schema_1 = require('../service/offered-service.schema');
const share_schema_1 = require('../share/share.schema');
const voluntary_schema_1 = require('../voluntary/voluntary.schema');
let User = class User {};
exports.User = User;
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, trim: true, minlength: 4 }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'mobile',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'provider',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'uid',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)({ type: String }), __metadata('design:type', String)],
  User.prototype,
  'bio',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, default: enum_1.User_Role.User }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'role',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      post: { type: mongoose_2.Types.ObjectId, ref: post_schema_1.Post.name },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'savedGroupPost',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      event: { type: mongoose_2.Types.ObjectId, ref: Event.name },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'savedEvent',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      share: {
        type: mongoose_2.Types.ObjectId,
        ref: share_schema_1.Share.name,
      },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'savedShare',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      question: {
        type: mongoose_2.Types.ObjectId,
        ref: question_schema_1.Question.name,
      },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'savedQuestion',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      voluntary: {
        type: mongoose_2.Types.ObjectId,
        ref: voluntary_schema_1.Voluntary.name,
      },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'savedVoluntary',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      user: { type: mongoose_2.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'followers',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      user: { type: mongoose_2.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'following',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  User.prototype,
  'followersCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  User.prototype,
  'followingCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      service: {
        type: mongoose_2.Types.ObjectId,
        ref: offered_service_schema_1.Offered.name,
      },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'savedService',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      _id: mongoose_2.Types.ObjectId,
      service: {
        type: mongoose_2.Types.ObjectId,
        ref: offered_service_schema_1.Offered.name,
      },
      createdAt: { type: Date, default: new Date() },
    }),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'requestedService',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata('design:type', Boolean),
  ],
  User.prototype,
  'active',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)({ type: Date }), __metadata('design:type', Date)],
  User.prototype,
  'verificationExpiresIn',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)({ type: String }), __metadata('design:type', String)],
  User.prototype,
  'VerificationCode',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  User.prototype,
  'averageRating',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  User.prototype,
  'ratingQuantity',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)({ type: String }), __metadata('design:type', String)],
  User.prototype,
  'icon',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      type: String,
      trim: true,
      lowercase: true,
    }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'fcm',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  User.prototype,
  'isBlocked',
  void 0,
);
exports.User = User = __decorate(
  [(0, mongoose_1.Schema)({ timestamps: true })],
  User,
);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map
