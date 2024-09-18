import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';

@Injectable()
export class RefreshGuard extends AuthenticationGuard {
  async extractToken(request: any) {
    let token: string = request.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
      throw new UnauthorizedException('Authorization header is missing');
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
}
