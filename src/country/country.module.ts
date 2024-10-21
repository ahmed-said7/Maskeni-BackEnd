import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './country.schema';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { ApiModule } from 'src/common/Api/api.module';
import { UserSchema } from 'src/user/user.schema';
import { AdminSchema } from 'src/admin/admin.schema';
import { SearchQuery } from 'src/share/feed.module';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeatureAsync([
      {
        name: Country.name,
        useFactory: () => {
          const schema = CountrySchema;
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
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
