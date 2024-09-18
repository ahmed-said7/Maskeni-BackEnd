import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ApiModule } from 'src/common/Api/api.module';

@Module({
  exports: [ReactionService],
  providers: [ReactionService],
  imports: [ApiModule],
})
export class ReactionModule {}
