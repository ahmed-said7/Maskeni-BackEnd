import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { PointDto } from './dto/point.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { Country, CountryDocument } from './country.schema';
import { CreateCountryDto } from './dto/create.country.dto';
// import { UpdateCountryDto } from './dto/update.country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
    private apiService: ApiService<CountryDocument, FindQuery>,
  ) {}

  async create(body: CreateCountryDto) {
    body.location = this.getLocations(
      body.coordinates.map((coord) => coord.coordinates),
    );
    delete body.coordinates;
    const country = await this.countryModel.create(body);
    return country;
  }

  async findAll() {
    return this.countryModel.find({});
  }

  async findOne(id: string) {
    const country = await this.countryModel.findById(id);
    if (!country) {
      throw new NotFoundException(`country with ID ${id} not found`);
    }
    return country;
  }
  getLocations(locs: [number, number][]) {
    return {
      type: 'Polygon',
      coordinates: [locs],
    };
  }

  // async update(id: string, body: UpdateCountryDto) {
  //   if (body.coordinates) {
  //     body.location = this.getLocations(
  //       body.coordinates.map((coord) => coord.coordinates),
  //     );
  //     delete body.coordinates;
  //   }
  //   const country = await this.countryModel.findByIdAndUpdate(id, body, {
  //     new: true,
  //   });
  //   if (!country) {
  //     throw new NotFoundException(`country with ID ${id} not found`);
  //   }
  //   return country;
  // }
  async findCountryContainingPoint(body: [number, number]) {
    const country = await this.countryModel.findOne({
      location: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: body, // [lng, lat]
          },
        },
      },
    });

    // if (!country) {
    //   throw new NotFoundException('No country contains the provided point');
    // }

    return country;
  }
  async getAllCountries(obj: FindQuery) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.countryModel.find(),
      obj,
    );
    const countries = await query;
    return { countries, pagination: paginationObj };
  }

  async remove(id: string) {
    const result = await this.countryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Quarter with ID ${id} not found`);
    }
    return { status: 'deleted' };
  }
}
