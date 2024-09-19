import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { FaxService } from './fax.service';
import { FaxController } from './fax.controller';
import { Fax, FaxSchema } from './fax.schema';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Fax.name, schema: FaxSchema },
    ]),
  ],
  providers: [FaxService],
  controllers: [FaxController],
})
export class FaxModule {}
