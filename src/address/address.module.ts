import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address, AddressSchema } from './address.schema';
import { UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { ApiModule } from 'src/common/Api/api.module';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: 'User', schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
