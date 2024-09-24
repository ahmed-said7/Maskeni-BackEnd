import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshService {
  constructor(private configService: ConfigService) {}
  private createtoken(
    userId: string,
    role: string,
    quarter?: string,
    city?: string,
    country?: string,
  ) {
    const accessToken = jwt.sign(
      { userId, role, quarter, city, country },
      this.configService.get<string>('access_secret'),
      {
        expiresIn: '1d',
      },
    );
    const refreshToken = jwt.sign(
      { userId, role, quarter },
      this.configService.get<string>('refresh_secret'),
      {
        expiresIn: '12d',
      },
    );
    return { accessToken, refreshToken };
  }
  async createAdminTokens(
    id: string,
    role: string,
    quarter?: string,
    city?: string,
    country?: string,
  ) {
    return this.createtoken(id, role, quarter, city, country);
  }
  async createUserTokens(
    id: string,
    role: string,
    quarter?: string,
    city?: string,
    country?: string,
  ) {
    return this.createtoken(id, role, quarter, city, country);
  }
}
