import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/event/event.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Share, ShareDocument } from 'src/share/share.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';
import { DashboardUpdateDeletedDto } from './dto/dashboard.query.dto';
import { Group, GroupDocument } from 'src/group/group.schema';

@Injectable()
export class SoftDeleteService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}
  async softDeleteEvents(id: string, obj: DashboardUpdateDeletedDto) {
    const event = await this.eventModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: !obj.isDeleted,
        },
        {
          isDeleted: obj.isDeleted,
          isAccepted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!event) {
      throw new NotFoundException(`event with ID ${id} not found`);
    }
    return { event };
  }
  async softDeleteShares(id: string, obj: DashboardUpdateDeletedDto) {
    const share = await this.shareModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: !obj.isDeleted,
        },
        {
          isDeleted: obj.isDeleted,
          isAccepted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!share) {
      throw new NotFoundException(`share with ID ${id} not found`);
    }
    return { share };
  }
  async softDeleteVoluntary(id: string, obj: DashboardUpdateDeletedDto) {
    const voluntary = await this.voluntaryModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: !obj.isDeleted,
        },
        {
          isDeleted: obj.isDeleted,
          isAccepted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!voluntary) {
      throw new NotFoundException(`voluntary with ID ${id} not found`);
    }
    return { voluntary };
  }
  async softDeleteService(id: string, obj: DashboardUpdateDeletedDto) {
    const service = await this.serviceModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: !obj.isDeleted,
        },
        {
          isDeleted: obj.isDeleted,
          isAccepted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!service) {
      throw new NotFoundException(`service with ID ${id} not found`);
    }
    return { service };
  }
  async softDeletePosts(id: string, obj: DashboardUpdateDeletedDto) {
    const post = await this.postModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: !obj.isDeleted,
        },
        {
          isDeleted: obj.isDeleted,
          isAccepted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!post) {
      throw new NotFoundException(`post with ID ${id} not found`);
    }
    return { post };
  }
  async softDeleteGroups(id: string, obj: DashboardUpdateDeletedDto) {
    const group = await this.groupModel
      .findOneAndUpdate(
        {
          _id: id,
          isDeleted: !obj.isDeleted,
        },
        {
          isDeleted: obj.isDeleted,
          isAccepted: false,
          isArchived: false,
        },
      )
      .setOptions({ skipFilter: true });
    if (!group) {
      throw new NotFoundException(`group with ID ${id} not found`);
    }
    return { group };
  }
}
