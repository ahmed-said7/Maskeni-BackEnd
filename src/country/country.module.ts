import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './country.schema';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Country.name,
        useFactory: () => {
          const schema = CountrySchema;
          schema.index({ location: '2dsphere' }); // Adding the 2dsphere index
          return schema;
        },
      },
    ]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
