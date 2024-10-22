import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.schema';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { User, UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { SearchQuery } from 'src/feed/feed.module';
// import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeatureAsync([
      {
        name: City.name,
        useFactory: () => {
          const schema = CitySchema;
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
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
