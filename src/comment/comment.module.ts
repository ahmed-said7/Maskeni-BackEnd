import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { CommentSchema } from './comment.schema';
import { ApiModule } from 'src/common/Api/api.module';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), // Registering Comment schema
  ],
  providers: [CommentService],
  exports: [CommentService], // Export if needed in other modules
})
export class CommentModule {}
