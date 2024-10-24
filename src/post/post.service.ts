import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, Post } from './post.schema';
import { Group, GroupDocument } from 'src/group/group.schema';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { Group_Privacy } from 'src/common/enum';
import { User, UserDocument } from 'src/user/user.schema';
import { LikesService } from 'src/likes/likes.service';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CommentService } from 'src/comment/comment.service';
import { Quarter } from 'src/quarter/quarter.schema';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<PostDocument>,
    private apiService: ApiService<PostDocument, FindQuery>,
    private likesService: LikesService,
    private commentService: CommentService,
  ) {
    this.reactionService.setModel(this.postModel);
  }
  async createPost(body: CreatePostDto, user: string) {
    body.user = user;
    await this.validateGroup(body.group, user);
    const post = await this.postModel.create(body);
    return { post };
  }
  async deletePost(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const groupExist = await this.groupModel.findOne({
      _id: post.group,
    });
    if (groupExist.admin.toString() == user) {
      post.isDeleted = true;
      await post.save();
      return { status: 'deleted' };
    }
    if (user != post.user.toString()) {
      throw new HttpException('you are not post owner', 400);
    }
    post.isDeleted = true;
    await post.save();
    return { status: 'deleted' };
  }
  async updatePost(body: UpdatePostDto, postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
      user,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const updated = await this.postModel.findByIdAndUpdate(postId, body, {
      new: true,
    });
    return { status: 'updated', post: updated };
  }
  async getGroupPosts(groupId: string, user: string, obj: FindQuery) {
    await this.validateGroup(groupId, user);
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      {
        group: groupId,
      },
    );
    let posts = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'name mobile icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      });
    const IUser = await this.userModel.findById(user);
    posts = posts.map((post) => {
      post.isLiked = IUser.favoriteGroupPost.includes(post._id);
      post.isSaved = post.saved.some((ele) => ele.user.toString() == user);
      return post;
    });
    return { posts, pagination: paginationObj };
  }
  async getUserGroupsPosts(user: string, obj: FindQuery) {
    const groups = await this.groupModel.find({
      $or: [{ users: user }, { privacy: Group_Privacy.Public }],
    });
    const ids = groups.map(({ _id }) => _id.toString());
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      {
        group: { $in: ids },
      },
    );
    let posts = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'name mobile icon',
      })
      .populate({ path: 'group', model: 'Group', select: 'name image' })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      });
    const IUser = await this.userModel.findById(user);
    posts = posts.map((post) => {
      post.isLiked = IUser.favoriteGroupPost.includes(post._id);
      post.isSaved = post.saved.some((ele) => ele.user.toString() == user);
      return post;
    });
    return { posts, pagination: paginationObj };
  }
  async addLike(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    // await this.validateGroup(post.group.toString(), user);
    const result = await this.reactionService.createLike(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { favoriteGroupPost: postId },
    });
    return result;
  }
  private async validateGroup(groupId: string, user: string) {
    let groupExist = await this.groupModel.findOne({
      _id: groupId,
    });

    if (!groupExist) {
      throw new HttpException('group not found', 400);
    }
    if (groupExist.privacy == Group_Privacy.Public) {
      return groupExist;
    }
    groupExist = await this.groupModel.findOne({
      _id: groupId,
      users: user,
      privacy: Group_Privacy.Private,
    });
    if (!groupExist) {
      throw new HttpException('you are not a member of this group', 400);
    }
    return groupExist;
  }
  async removeLike(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    // await this.validateGroup(post.group.toString(), user);
    const result = await this.reactionService.deleteLike(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { favoriteGroupPost: postId },
    });
    return result;
  }
  async getLikes(postId: string, user: string, query: FindQuery) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    // await this.validateGroup(post.group.toString(), user);
    return this.likesService.getPostLikes(post.likes, query);
  }
  async addComment(body: CreateCommentDto, postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    body.post = postId;
    const comment = await this.reactionService.createComment(body);
    await this.postModel.findByIdAndUpdate(body.post, {
      $addToSet: { comments: comment._id },
      $inc: { commentCount: 1 },
    });
    return comment;
  }
  async removeComment(commentId: string, user: string) {
    return this.reactionService.deleteComment(commentId, user);
  }
  async getComments(postId: string, user: string, query: FindQuery) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    // await this.validateGroup(post.group.toString(), user);
    return this.commentService.getPostComments(post.comments, query);
  }
  async addSaved(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const result = await this.reactionService.createSaved(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedGroupPost: { post: postId } },
    });
    return result;
  }
  async deleteSaved(postId: string, user: string) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const result = await this.reactionService.deleteSaved(postId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedGroupPost: { post: postId } },
    });
    return result;
  }
  async getAllSaved(postId: string, query: FindQuery) {
    const post = await this.postModel.findOne({
      _id: postId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    // await this.validateGroup(post.group.toString(), user);
    return this.reactionService.getAllSaved(query, postId);
  }
  async getMyArchivedPosts(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      { isArchived: true, user },
    );
    const posts = await query
      .setOptions({ skipFilter: true })
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
      });
    return { posts, pagination: paginationObj };
  }
  async getMyDeletedPosts(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.postModel.find(),
      obj,
      { isDeleted: true, user },
    );
    const posts = await query
      .setOptions({ skipFilter: true })
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
      });
    return { posts, pagination: paginationObj };
  }
}
