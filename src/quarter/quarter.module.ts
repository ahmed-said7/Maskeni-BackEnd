import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuarterService } from './quarter.service';
import { QuarterController } from './quarter.controller';
import { Quarter, QuarterSchema } from './quarter.schema';
import { CountryModule } from 'src/country/country.module';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [
    CountryModule,
    CityModule,
    MongooseModule.forFeatureAsync([
      {
        name: Quarter.name,
        useFactory: () => {
          const schema = QuarterSchema;
          schema.index({ location: '2dsphere' }); // Adding the 2dsphere index
          return schema;
        },
      },
    ]),
  ],
  controllers: [QuarterController],
  providers: [QuarterService],
})
export class QuarterModule {}
