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
exports.QuestionSchema = exports.Question = void 0;
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const likes_schema_1 = require('../likes/likes.schema');
let Question = class Question {};
exports.Question = Question;
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata('design:type', String),
  ],
  Question.prototype,
  'content',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, default: 'question' }),
    __metadata('design:type', String),
  ],
  Question.prototype,
  'postType',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [50, 50],
      },
    }),
    __metadata('design:type', Object),
  ],
  Question.prototype,
  'location',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  Question.prototype,
  'isDeleted',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  Question.prototype,
  'isAccepted',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  Question.prototype,
  'isArchived',
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
  Question.prototype,
  'saved',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      type: [mongoose_2.Types.ObjectId],
      ref: 'Comment',
      default: [],
    }),
    __metadata('design:type', Array),
  ],
  Question.prototype,
  'comments',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      type: [mongoose_2.Types.ObjectId],
      ref: likes_schema_1.Likes.name,
      default: [],
    }),
    __metadata('design:type', Array),
  ],
  Question.prototype,
  'likes',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Question.prototype,
  'likeCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Question.prototype,
  'commentCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Question.prototype,
  'savedCount',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)([String]), __metadata('design:type', Array)],
  Question.prototype,
  'images',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata('design:type', mongoose_2.Types.ObjectId),
  ],
  Question.prototype,
  'user',
  void 0,
);
exports.Question = Question = __decorate(
  [(0, mongoose_1.Schema)({ timestamps: true })],
  Question,
);
exports.QuestionSchema = mongoose_1.SchemaFactory.createForClass(Question);
//# sourceMappingURL=question.schema.js.map
