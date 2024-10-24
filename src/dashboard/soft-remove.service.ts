import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from 'src/event/event.schema';
import { Group, GroupDocument } from 'src/group/group.schema';
import { PostDocument, Post } from 'src/post/post.schema';
import { Offered, OfferedDocument } from 'src/service/offered-service.schema';
import { Feed, FeedDocument } from 'src/feed/feed.schema';
import { Voluntary, VoluntaryDocument } from 'src/voluntary/voluntary.schema';

@Injectable()
export class SoftRemoveService {
  constructor(
    @InjectModel(Offered.name) private serviceModel: Model<OfferedDocument>,
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}
  async softRemoveEvents(id: string) {
    const event = await this.eventModel
      .findOneAndDelete({
        _id: id,
      })
      .setOptions({ skipFilter: true });
    if (!event) {
      throw new NotFoundException(`event with ID ${id} not found`);
    }
    return { event };
  }
  async softRemoveFeed(id: string) {
    const post = await this.feedModel
      .findOneAndDelete({
        _id: id,
      })
      .setOptions({ skipFilter: true });
    if (!post) {
      throw new NotFoundException(`post with ID ${id} not found`);
    }
    return { post };
  }
  async softRemoveVoluntary(id: string) {
    const voluntary = await this.voluntaryModel
      .findOneAndDelete({
        _id: id,
      })
      .setOptions({ skipFilter: true });
    if (!voluntary) {
      throw new NotFoundException(`voluntary with ID ${id} not found`);
    }
    return { voluntary };
  }
  async softRemoveService(id: string) {
    const service = await this.serviceModel
      .findOneAndDelete({
        _id: id,
      })
      .setOptions({ skipFilter: true });
    if (!service) {
      throw new NotFoundException(`service with ID ${id} not found`);
    }
    return { service };
  }
  async softRemovePosts(id: string) {
    const post = await this.postModel
      .findOneAndDelete({
        _id: id,
      })
      .setOptions({ skipFilter: true });
    if (!post) {
      throw new NotFoundException(`post with ID ${id} not found`);
    }
    return { post };
  }
  async softRemoveGroup(id: string) {
    const group = await this.groupModel
      .findOneAndDelete({ _id: id })
      .setOptions({ skipFilter: true });
    if (!group) {
      throw new NotFoundException(`
        group with ID ${id} not found`);
    }
    return { group };
  }
}
