import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { Likes, LikesSchema } from './likes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Likes.name, schema: LikesSchema }]),
  ],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
