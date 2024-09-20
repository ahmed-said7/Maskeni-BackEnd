import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from './address.schema';
import { CreateAddressDto } from './dto/create.address.dto';
import { AddressQueryDto } from './dto/query.address.dto';
import { ApiService } from 'src/common/Api/api.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private apiService: ApiService<AddressDocument, AddressQueryDto>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const newAddress = new this.addressModel(createAddressDto);
    return newAddress.save();
  }

  async findAll(obj: AddressQueryDto, userId: string) {
    obj.user = userId;
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.addressModel.find(),
      obj,
    );
    const addresse = await query
      .populate('quarter')
      .populate('country')
      .populate('city');
    return { addresse, pagination: paginationObj };
  }

  async update(id: string, updateAddressDto: any): Promise<Address> {
    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      id,
      updateAddressDto,
      { new: true },
    );
    if (!updatedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return updatedAddress;
  }

  async remove(id: string): Promise<void> {
    const result = await this.addressModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
  }
}
