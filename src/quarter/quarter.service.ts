import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quarter, QuarterDocument } from './quarter.schema';
import { CreateQuarterDto } from './dto/quarter.create.dto';
import { PointDto } from './dto/point.dto';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { QuarterQueryDto } from './dto/quarter.query.dto';

@Injectable()
export class QuarterService {
  constructor(
    @InjectModel(Quarter.name) private quarterModel: Model<QuarterDocument>,
    private apiService: ApiService<QuarterDocument, FindQuery>,
  ) {}

  async create(body: CreateQuarterDto): Promise<Quarter> {
    body.location = this.getLocations(
      body.coordinates.map((coord) => coord.coordinates),
    );
    // await this.countryService.findOne(body.country);
    // await this.cityService.findOne(body.city);
    delete body.coordinates;
    const createdQuarter = await this.quarterModel.create(body);
    return createdQuarter;
  }

  async findAll(): Promise<Quarter[]> {
    return this.quarterModel.find({});
  }

  async findOne(id: string): Promise<Quarter> {
    const quarter = await this.quarterModel.findById(id);
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
  async findQuarterContainingPoint(body: PointDto) {
    const quarter = await this.quarterModel.findOne({
      location: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: body.coordinates, // [lng, lat]
          },
        },
      },
    });

    if (!quarter) {
      throw new NotFoundException('No quarter contains the provided point');
    }

    return quarter;
  }
  async getAllQuarters(obj: QuarterQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.quarterModel.find(),
      obj,
    );
    const quarters = await query;
    return { quarters, pagination: paginationObj };
  }

  async remove(id: string) {
    const result = await this.quarterModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!result) {
      throw new NotFoundException(`Quarter with ID ${id} not found`);
    }
    return { status: 'deleted' };
  }
}