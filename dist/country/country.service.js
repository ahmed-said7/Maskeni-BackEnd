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
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_service_1 = require("../common/Api/api.service");
const country_schema_1 = require("./country.schema");
let CountryService = class CountryService {
    constructor(countryModel, apiService) {
        this.countryModel = countryModel;
        this.apiService = apiService;
    }
    async create(body) {
        body.location = this.getLocations(body.coordinates.map((coord) => coord.coordinates));
        delete body.coordinates;
        const country = await this.countryModel.create(body);
        return country;
    }
    async findAll() {
        return this.countryModel.find({});
    }
    async findOne(id) {
        const country = await this.countryModel.findById(id);
        if (!country) {
            throw new common_1.NotFoundException(`country with ID ${id} not found`);
        }
        return country;
    }
    getLocations(locs) {
        return {
            type: 'Polygon',
            coordinates: [locs],
        };
    }
    async findCountryContainingPoint(body) {
        const country = await this.countryModel.findOne({
            location: {
                $geoIntersects: {
                    $geometry: {
                        type: 'Point',
                        coordinates: body.coordinates,
                    },
                },
            },
        });
        if (!country) {
            throw new common_1.NotFoundException('No country contains the provided point');
        }
        return country;
    }
    async getAllCountries(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.countryModel.find(), obj);
        const countries = await query;
        return { countries, pagination: paginationObj };
    }
    async remove(id) {
        const result = await this.countryModel.findByIdAndUpdate(id, {
            isDeleted: true,
        });
        if (!result) {
            throw new common_1.NotFoundException(`Quarter with ID ${id} not found`);
        }
        return { status: 'deleted' };
    }
};
exports.CountryService = CountryService;
exports.CountryService = CountryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(country_schema_1.Country.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_service_1.ApiService])
], CountryService);
//# sourceMappingURL=country.service.js.map