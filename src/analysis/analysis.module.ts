import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { Offered, OfferedSchema } from 'src/service/offered-service.schema';
import { Voluntary, VoluntarySchema } from 'src/voluntary/voluntary.schema';
import { Share, ShareSchema } from 'src/share/share.schema';
import { Event, EventSchema } from 'src/event/event.schema';
import { Post, PostSchema } from 'src/post/post.schema';
import { UserSchema } from 'src/user/user.schema';
import { AdminSchema } from 'src/admin/admin.schema';
import { Address, AddressSchema } from 'src/address/address.schema';
import { Quarter, QuarterSchema } from 'src/quarter/quarter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offered.name, schema: OfferedSchema },
      { name: Voluntary.name, schema: VoluntarySchema },
      { name: Share.name, schema: ShareSchema },
      { name: Event.name, schema: EventSchema },
      { name: Post.name, schema: PostSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Admin', schema: AdminSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Quarter.name, schema: QuarterSchema },
    ]),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
