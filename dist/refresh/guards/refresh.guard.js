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
exports.RefreshGuard = void 0;
const common_1 = require('@nestjs/common');
const authentication_guard_1 = require('../../common/guards/authentication.guard');
let RefreshGuard = class RefreshGuard extends authentication_guard_1.AuthenticationGuard {
  async extractToken(request) {
    let token = request.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
      throw new common_1.UnauthorizedException(
        'Authorization header is missing',
      );
    }
    token = token.split(' ')[1];
    const { userId, role } = await this.decode(
      token,
      this.config.get('refresh_secret'),
    );
    request.userId = userId;
    request.role = role;
    return true;
  }
};
exports.RefreshGuard = RefreshGuard;
exports.RefreshGuard = RefreshGuard = __decorate(
  [(0, common_1.Injectable)()],
  RefreshGuard,
);
//# sourceMappingURL=refresh.guard.js.map
