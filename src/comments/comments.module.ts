import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), // Registering Comment schema
  ],
  providers: [CommentService],
  exports: [CommentService], // Export if needed in other modules
})
export class CommentModule {}
