import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  async getFeed(@Query() query: FeedQueryDto) {
    return this.feedService.getFeed(query);
  }
}
