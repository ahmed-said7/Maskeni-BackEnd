import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/event/event.schema';
import { Post, PostSchema } from 'src/post/post.schema';
import { Offered, OfferedSchema } from 'src/service/offered-service.schema';
import { Share, ShareSchema } from 'src/share/share.schema';
import { Voluntary, VoluntarySchema } from 'src/voluntary/voluntary.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { User, UserSchema } from 'src/user/user.schema';
import { Admin, AdminSchema } from 'src/admin/admin.schema';
import { DashboardDeletedService } from './query-deleted.service';
import { DashboardArchivedService } from './query-archived.service';
import { DashboardAcceptedService } from './query-accepted.service';
import { DashboardDeletedController } from './query.-deleted.controller';
import { DashboardArchivedController } from './query-archived.controller';
import { DashboardAcceptedController } from './query-accepted.controlle';
import { SoftAcceptController } from './soft-accept.controller';
import { SoftAcceptService } from './soft-accept.service';
import { SoftDeleteService } from './soft-delete.service';
import { SoftRemoveService } from './soft-remove.service';
import { SoftArchiveService } from './soft-archived.service';
import { SoftArchiveController } from './soft-archived.controller';
import { SoftRemoveController } from './soft-remove.controller';
import { SoftDeleteController } from './soft-delete.controller';
import { QueryAllController } from './query-all.controller';
import { QueryAllService } from './query-all.service';
import { Group, GroupSchema } from 'src/group/group.schema';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Post.name, schema: PostSchema },
      { name: Offered.name, schema: OfferedSchema },
      { name: Share.name, schema: ShareSchema },
      { name: Voluntary.name, schema: VoluntarySchema },
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [
    DashboardAcceptedController,
    DashboardArchivedController,
    DashboardDeletedController,
    SoftArchiveController,
    SoftRemoveController,
    SoftDeleteController,
    SoftAcceptController,
    QueryAllController,
  ],
  providers: [
    DashboardAcceptedService,
    DashboardArchivedService,
    DashboardDeletedService,
    SoftAcceptService,
    SoftDeleteService,
    SoftRemoveService,
    SoftArchiveService,
    QueryAllService,
  ],
})
export class DashboardModule {}
