import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Likes, LikesDocument } from './likes.schema';
import { LikeDto } from './dto/likes.create.dto';
import { LikesQueryDto } from './dto/likes.query.dto';
import { ApiService } from 'src/common/Api/api.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Likes.name) private likesModel: Model<LikesDocument>,
    private apiService: ApiService<LikesDocument, LikesQueryDto>,
  ) {}

  // Add a new like, but ensure the user hasn't liked the post before
  async addLike(likeDto: LikeDto): Promise<Likes> {
    const { user, post } = likeDto;

    // Check if the user already liked the post
    const existingLike = await this.likesModel.findOne({ user, post }).exec();
    if (existingLike) {
      throw new BadRequestException('User already liked this post');
    }

    // Create and save the like
    const newLike = await this.likesModel.create(likeDto);
    return newLike;
  }

  // Remove a like, but ensure the user has liked the post before
  async removeLike(likeDto: LikeDto) {
    const { user, post } = likeDto;

    // Check if the user has liked the post
    const existingLike = await this.likesModel.findOneAndDelete({ user, post });
    if (!existingLike) {
      throw new NotFoundException('User has not liked this post');
    }
    return existingLike;
  }

  // Get all likes for a specific post
  async findAll(obj: LikesQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.likesModel.find(),
      obj,
    );
    const likes = await query;
    return { likes, pagination: paginationObj };
  }
}
