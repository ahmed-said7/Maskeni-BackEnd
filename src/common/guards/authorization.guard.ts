import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }
    return roles.includes(req.role);
  }
}
