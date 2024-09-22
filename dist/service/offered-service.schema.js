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
exports.OfferedSchema = exports.Offered = void 0;
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const types_1 = require('../common/types');
const likes_schema_1 = require('../likes/likes.schema');
let Offered = class Offered {};
exports.Offered = Offered;
__decorate(
  [
    (0, mongoose_1.Prop)({
      type: [mongoose_2.Types.ObjectId],
      ref: 'Comment',
      default: [],
    }),
    __metadata('design:type', Array),
  ],
  Offered.prototype,
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
  Offered.prototype,
  'likes',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata('design:type', String),
  ],
  Offered.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: String, default: 'service' }),
    __metadata('design:type', String),
  ],
  Offered.prototype,
  'postType',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)({ type: String }), __metadata('design:type', String)],
  Offered.prototype,
  'details',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({
      type: String,
      enum: types_1.Jop_Type,
      default: types_1.Jop_Type.education,
    }),
    __metadata('design:type', String),
  ],
  Offered.prototype,
  'type',
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
  Offered.prototype,
  'location',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  Offered.prototype,
  'isDeleted',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  Offered.prototype,
  'isAccepted',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata('design:type', Boolean),
  ],
  Offered.prototype,
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
  Offered.prototype,
  'saved',
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
  Offered.prototype,
  'requested',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Offered.prototype,
  'likeCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Offered.prototype,
  'commentCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Offered.prototype,
  'savedCount',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Offered.prototype,
  'price',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata('design:type', Number),
  ],
  Offered.prototype,
  'requestedCount',
  void 0,
);
__decorate(
  [(0, mongoose_1.Prop)([String]), __metadata('design:type', Array)],
  Offered.prototype,
  'images',
  void 0,
);
__decorate(
  [
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata('design:type', mongoose_2.Types.ObjectId),
  ],
  Offered.prototype,
  'user',
  void 0,
);
exports.Offered = Offered = __decorate(
  [(0, mongoose_1.Schema)({ timestamps: true })],
  Offered,
);
exports.OfferedSchema = mongoose_1.SchemaFactory.createForClass(Offered);
//# sourceMappingURL=offered-service.schema.js.map
