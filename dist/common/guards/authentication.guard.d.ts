import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AdminDocument } from 'src/admin/admin.schema';
export declare class AuthenticationGuard implements CanActivate {
  protected readonly userModel: Model<AdminDocument>;
  protected config: ConfigService;
  constructor(userModel: Model<AdminDocument>, config: ConfigService);
  canActivate(context: ExecutionContext): Promise<boolean>;
  extractToken(request: any): Promise<boolean>;
  decode(
    token: string,
    secret: string,
  ): Promise<{
    userId: string;
    role: string;
  }>;
}
