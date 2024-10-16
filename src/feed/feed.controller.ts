import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';

@ApiTags('Feed') // Tag for grouping related endpoints
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
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
  async getFeed(@Query() query: FeedQueryDto, @Req() req: any) {
    return this.feedService.getFeed(query, req.userId);
  }
}
