import { Model } from 'mongoose';
import { Address, AddressDocument } from './address.schema';
import { CreateAddressDto } from './dto/create.address.dto';
import { AddressQueryDto } from './dto/query.address.dto';
import { ApiService } from 'src/common/Api/api.service';
export declare class AddressService {
  private addressModel;
  private apiService;
  constructor(
    addressModel: Model<AddressDocument>,
    apiService: ApiService<AddressDocument, AddressQueryDto>,
  );
  create(createAddressDto: CreateAddressDto): Promise<Address>;
  findAll(
    obj: AddressQueryDto,
    userId: string,
  ): Promise<{
    addresse: (import('mongoose').Document<unknown, {}, Address> &
      Address & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  update(id: string, updateAddressDto: any): Promise<Address>;
  remove(id: string): Promise<void>;
}
