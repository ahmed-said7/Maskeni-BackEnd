import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from './city.schema';
import { PointDto } from './dto/point.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { CreateCityDto } from './dto/city.create.dto';
import { CityQueryDto } from './dto/city.query.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
    private apiService: ApiService<CityDocument, FindQuery>,
  ) {}

  async create(body: CreateCityDto) {
    body.location = this.getLocations(
      body.coordinates.map((coord) => coord.coordinates),
    );
    const city = await this.cityModel.create(body);
    return city;
  }

  async findAll() {
    return this.cityModel.find({});
  }

  async findOne(id: string) {
    const quarter = await this.cityModel.findById(id);
    if (!quarter) {
      throw new NotFoundException(`Quarter with ID ${id} not found`);
    }
    return quarter;
  }
  getLocations(locs: [number, number][]) {
    return {
      type: 'Polygon',
      coordinates: [locs],
    };
  }
  async findCityContainingPoint(pointDto: PointDto) {
    const city = await this.cityModel.findOne({
      location: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: pointDto.coordinates, // [lng, lat]
          },
        },
      },
    });

    // if (!city) {
    //   throw new NotFoundException('No city contains the provided point');
    // }

    return city;
  }
  async getAllCities(obj: CityQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.cityModel.find(),
      obj,
    );
    const quarters = await query;
    return { quarters, pagination: paginationObj };
  }

  async remove(id: string) {
    const city = await this.cityModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return { status: 'deleted' };
  }
}
