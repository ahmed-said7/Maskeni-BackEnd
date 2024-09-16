import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/common/Api/api.module';
import { AuthModule } from 'src/refresh/auth.module';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';
import { AdminProfileController } from './profile.controller';
import { AdminAuthController } from './auth.controller';

@Module({
  controllers: [
    AdminAuthController,
    AdminAuthController,
    AdminProfileController,
  ],
  providers: [AdminService],
  imports: [
    ApiModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      //   { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [AdminService],
})
export class AdminModule {}
