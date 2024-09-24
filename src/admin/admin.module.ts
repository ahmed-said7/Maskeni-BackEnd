import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';
import { AdminProfileController } from './profile.controller';
import { AdminAuthController } from './auth.controller';
import { RefreshModule } from 'src/refresh/refresh.module';
import { UserSchema } from 'src/user/user.schema';
import { QuarterModule } from 'src/quarter/quarter.module';

@Module({
  controllers: [
    AdminAuthController,
    AdminAuthController,
    AdminProfileController,
  ],
  providers: [AdminService],
  imports: [
    QuarterModule,
    ApiModule,
    RefreshModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  exports: [AdminService],
})
export class AdminModule {}
