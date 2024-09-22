import { RefreshService } from './refresh.service';
export declare class RefreshController {
  private AuthService;
  constructor(AuthService: RefreshService);
  RefreshAdmin(req: any): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  RefreshUser(req: any): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
