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
exports.CatchAppExceptionsFilter = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const core_1 = require('@nestjs/core');
let CatchAppExceptionsFilter = class CatchAppExceptionsFilter extends core_1.BaseExceptionFilter {
  constructor(configService) {
    super();
    this.configService = configService;
  }
  catch(exception, host) {
    const object = {};
    console.log(exception);
    object.code = 400;
    const res = host.switchToHttp().getResponse();
    if (
      exception?.response?.message &&
      Array.isArray(exception.response.message)
    ) {
      this.handleNestError(exception.response, object);
    } else if (exception instanceof common_1.HttpException) {
      this.handleHttpException(exception, object);
    } else if (exception.name === 'ValidationError') {
      this.handleMongoValidatioError(exception, object);
    } else if (exception.name === 'CastError') {
      this.handleCastError(exception, object);
    } else if (exception.code === 11000) {
      this.handleDuplicationError(exception, object);
    } else {
      this.internalError(res, exception);
    }
    res.status(object.code).send(object);
  }
  handleDuplicationError(exception, object) {
    const val = exception.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    object.message = ` duplicate value of ${val} `;
  }
  handleMongoValidatioError(exception, object) {
    object.message = Object.values(exception.errors)
      .map((Err) => Err.message)
      .join(' and ');
  }
  handleCastError(exception, object) {
    object.message = `invalid ${exception.path} value ${exception.value}`;
  }
  handleNestError(exception, object) {
    object.message = exception.message.join(' and ');
    object.code = exception.statusCode;
  }
  handleHttpException(exception, object) {
    object.message = exception.message;
    object.code = exception.getStatus();
  }
  internalError(res, exception) {
    if (this.configService.get('Node_Env') === 'production') {
      res.status(500).send({ message: 'internal server error', code: 400 });
    } else {
      res.status(500).send({ ...exception });
    }
  }
};
exports.CatchAppExceptionsFilter = CatchAppExceptionsFilter;
exports.CatchAppExceptionsFilter = CatchAppExceptionsFilter = __decorate(
  [
    (0, common_1.Catch)(),
    __metadata('design:paramtypes', [config_1.ConfigService]),
  ],
  CatchAppExceptionsFilter,
);
//# sourceMappingURL=global-filter.js.map
