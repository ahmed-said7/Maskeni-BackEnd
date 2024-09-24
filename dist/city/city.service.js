"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const city_schema_1 = require("./city.schema");
const api_service_1 = require("../common/Api/api.service");
let CityService = class CityService {
    constructor(cityModel, apiService) {
        this.cityModel = cityModel;
        this.apiService = apiService;
    }
    async create(body) {
        body.location = this.getLocations(body.coordinates.map((coord) => coord.coordinates));
        const city = await this.cityModel.create(body);
        return city;
    }
    async findAll() {
        return this.cityModel.find({});
    }
    async findOne(id) {
        const quarter = await this.cityModel.findById(id);
        if (!quarter) {
            throw new common_1.NotFoundException(`Quarter with ID ${id} not found`);
        }
        return quarter;
    }
    getLocations(locs) {
        return {
            type: 'Polygon',
            coordinates: [locs],
        };
    }
    async findCityContainingPoint(pointDto) {
        const city = await this.cityModel.findOne({
            location: {
                $geoIntersects: {
                    $geometry: {
                        type: 'Point',
                        coordinates: pointDto,
                    },
                },
            },
        });
        return city;
    }
    async getAllCities(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.cityModel.find(), obj);
        const quarters = await query;
        return { quarters, pagination: paginationObj };
    }
    async remove(id) {
        const city = await this.cityModel.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        if (!city) {
            throw new common_1.NotFoundException(`City with ID ${id} not found`);
        }
        return { status: 'deleted' };
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(city_schema_1.City.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_service_1.ApiService])
], CityService);
//# sourceMappingURL=city.service.js.map