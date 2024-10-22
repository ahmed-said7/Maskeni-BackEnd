import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuarterService } from './quarter.service';
import { QuarterController } from './quarter.controller';
import { Quarter, QuarterSchema } from './quarter.schema';
import { CountryModule } from 'src/country/country.module';
import { CityModule } from 'src/city/city.module';
import { AdminSchema } from 'src/admin/admin.schema';
import { UserSchema } from 'src/user/user.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { SearchQuery } from 'src/feed/feed.module';

@Module({
  imports: [
    CountryModule,
    CityModule,
    ApiModule,
    MongooseModule.forFeatureAsync([
      {
        name: Quarter.name,
        useFactory: () => {
          const schema = QuarterSchema;
          schema.index({ location: '2dsphere' }); // Adding the 2dsphere index
          schema.pre<SearchQuery>(/^find/, function () {
            if (!this.getOptions().skipFilter) {
              this.find({
                isDeleted: false,
              });
            }
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
  ],
  controllers: [QuarterController],
  providers: [QuarterService],
  exports: [QuarterService],
})
export class QuarterModule {}
