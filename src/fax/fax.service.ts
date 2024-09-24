import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fax, FaxDocument } from './fax.schema';
import { CreateFaxDto } from './dto/create.fax.dto';
import { UpdateFaxDto } from './dto/update.fax.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';

@Injectable()
export class FaxService {
  constructor(
    @InjectModel(Fax.name) private faxModel: Model<FaxDocument>,
    private apiService: ApiService<FaxDocument, FindQuery>,
  ) {}
  async createFax(body: CreateFaxDto) {
    const fax = await this.faxModel.create(body);
    return { fax };
  }
  async deleteFax(id: string) {
    const fax = await this.faxModel.findByIdAndDelete(id);
    if (!fax) {
      throw new HttpException('fax not found', 400);
    }
    return { status: 'deleted' };
  }
  async getAllFaxs(obj: FindQuery) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.faxModel.find(),
      obj,
    );
    const events = await query;
    return { events, pagination: paginationObj };
  }
  async updateFax(body: UpdateFaxDto, faxId: string) {
    const fax = await this.faxModel.findByIdAndUpdate(faxId, body, {
      new: true,
    });
    if (!fax) {
      throw new HttpException('fax not found', 400);
    }
    return { fax };
  }
}
