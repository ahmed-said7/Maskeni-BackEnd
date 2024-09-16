import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  private createtoken(userId: string, role: string) {
    const accessToken = jwt.sign(
      { userId, role },
      this.configService.get<string>('access_secret'),
      {
        expiresIn: '1d',
      },
    );
    const refreshToken = jwt.sign(
      { userId, role },
      this.configService.get<string>('refresh_secret'),
      {
        expiresIn: '12d',
      },
    );
    return { accessToken, refreshToken };
  }
  async createAdminTokens(id: string, role: string) {
    return this.createtoken(id, role);
  }
  async createUserTokens(id: string, role: string) {
    return this.createtoken(id, role);
  }
}
