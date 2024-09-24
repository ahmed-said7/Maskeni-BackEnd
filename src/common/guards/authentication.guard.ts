import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Admin, AdminDocument } from 'src/admin/admin.schema';
import { Payload } from '../types';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    @InjectModel(Admin.name) protected readonly userModel: Model<AdminDocument>,
    protected config: ConfigService,
  ) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return this.extractToken(request);
  }
  async extractToken(request: any) {
    let token: string = request.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    token = token.split(' ')[1];
    const { userId, role, country, city, quarter } = await this.decode(
      token,
      this.config.get('access_secret'),
    );
    request.userId = userId;
    request.role = role;
    request.country = country;
    request.city = city;
    request.quarter = quarter;
    return true;
  }
  async decode(token: string, secret: string) {
    let payload: Payload;
    try {
      payload = jwt.verify(token, secret) as Payload;
    } catch (e) {
      throw new UnauthorizedException('invalid token');
    }
    return {
      userId: payload.userId,
      role: payload.role,
      country: payload.country,
      city: payload.city,
      quarter: payload.quarter,
    };
  }
}
