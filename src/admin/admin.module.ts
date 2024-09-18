import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';
import { AdminProfileController } from './profile.controller';
import { AdminAuthController } from './auth.controller';
import { RefreshModule } from 'src/refresh/refresh.module';

@Module({
  controllers: [
    AdminAuthController,
    AdminAuthController,
    AdminProfileController,
  ],
  providers: [AdminService],
  imports: [
    ApiModule,
    RefreshModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      //   { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [AdminService],
})
export class AdminModule {}
