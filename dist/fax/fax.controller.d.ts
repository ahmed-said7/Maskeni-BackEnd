import { FaxService } from './fax.service';
import { CreateFaxDto } from './dto/create.fax.dto';
import { FindQuery } from 'src/common/types';
import { UpdateFaxDto } from './dto/update.fax.dto';
export declare class FaxController {
  private faxService;
  constructor(faxService: FaxService);
  createContact(body: CreateFaxDto): Promise<{
    fax: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./fax.schema').Fax> &
        import('./fax.schema').Fax & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./fax.schema').Fax> &
      import('./fax.schema').Fax & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getAllContact(query: FindQuery): Promise<{
    events: (import('mongoose').Document<
      unknown,
      {},
      import('./fax.schema').Fax
    > &
      import('./fax.schema').Fax & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  deleteQuestion(faxId: string): Promise<{
    status: string;
  }>;
  updateQuestion(
    faxId: string,
    body: UpdateFaxDto,
  ): Promise<{
    fax: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./fax.schema').Fax> &
        import('./fax.schema').Fax & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./fax.schema').Fax> &
      import('./fax.schema').Fax & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
}
