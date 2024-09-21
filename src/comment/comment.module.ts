import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { CommentSchema } from './comment.schema';
import { ApiModule } from 'src/common/Api/api.module';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    ApiModule,
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]), // Registering Comment schema
  ],
  providers: [CommentService],
  exports: [CommentService], // Export if needed in other modules
  controllers: [CommentController],
})
export class CommentModule {}
