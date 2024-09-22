import { AddressService } from './address.service';
import { AddressQueryDto } from './dto/query.address.dto';
import { UpdateAddressDto } from './dto/update.address.dto';
import { CreateAddressDto } from './dto/create.address.dto';
export declare class AddressController {
  private readonly addressService;
  constructor(addressService: AddressService);
  create(
    createAddressDto: CreateAddressDto,
    req: any,
  ): Promise<import('./address.schema').Address>;
  findAll(
    query: AddressQueryDto,
    req: any,
  ): Promise<{
    addresse: (import('mongoose').Document<
      unknown,
      {},
      import('./address.schema').Address
    > &
      import('./address.schema').Address & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<import('./address.schema').Address>;
  remove(id: string): Promise<void>;
}
