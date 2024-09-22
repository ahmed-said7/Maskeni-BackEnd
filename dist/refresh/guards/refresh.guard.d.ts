import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
export declare class RefreshGuard extends AuthenticationGuard {
    extractToken(request: any): Promise<boolean>;
}
