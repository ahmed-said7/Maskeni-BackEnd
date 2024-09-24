import { ConfigService } from '@nestjs/config';
export declare class RefreshService {
    private configService;
    constructor(configService: ConfigService);
    private createtoken;
    createAdminTokens(id: string, role: string, quarter?: string, city?: string, country?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    createUserTokens(id: string, role: string, quarter?: string, city?: string, country?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
