import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.schema';
import { CityController } from './city.controller';
import { CityService } from './city.service';
// import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: City.name,
        useFactory: () => {
          const schema = CitySchema;
          schema.index({ location: '2dsphere' }); // Adding the 2dsphere index
          return schema;
        },
      },
    ]),
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
