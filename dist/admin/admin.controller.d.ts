import { AdminService } from './admin.service';
import { FindQuery } from 'src/common/types';
export declare class AdminController {
  private adminService;
  constructor(adminService: AdminService);
  getAdmins(query: FindQuery): Promise<{
    admins: (import('mongoose').Document<
      unknown,
      {},
      import('./admin.schema').Admin
    > &
      import('./admin.schema').Admin & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  deleteAdmin(adminId: string): Promise<{
    status: string;
  }>;
  getAdmin(adminId: string): Promise<{
    admin: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./admin.schema').Admin> &
        import('./admin.schema').Admin & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./admin.schema').Admin> &
      import('./admin.schema').Admin & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
}
