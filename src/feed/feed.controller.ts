import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Feed') // Tag for grouping related endpoints
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: 'Get Feed',
    description: 'Retrieves the feed items based on provided query parameters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the feed items.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access, user not authenticated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid query parameters.',
  })
  async getFeed(@Query() query: FeedQueryDto) {
    return this.feedService.getFeed(query);
  }
}
