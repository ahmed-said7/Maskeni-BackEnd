import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SoftAcceptService } from './soft-accept.service';
import { DashboardUpdateAcceptedDto } from './dto/dashboard.query.dto';

@Controller('soft-accept')
export class SoftAcceptController {
  constructor(private readonly softAcceptService: SoftAcceptService) {}

  @Patch('questions/:id')
  async softAcceptQuestion(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptQuestions(id, updateAcceptedDto);
  }

  @Patch('events/:id')
  async softAcceptEvent(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptEvents(id, updateAcceptedDto);
  }

  @Patch('shares/:id')
  async softAcceptShare(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptShares(id, updateAcceptedDto);
  }

  @Patch('voluntary/:id')
  async softAcceptVoluntary(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptVoluntary(id, updateAcceptedDto);
  }

  @Patch('services/:id')
  async softAcceptOfferedService(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptService(id, updateAcceptedDto);
  }

  @Patch('posts/:id')
  async softAcceptPost(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptPosts(id, updateAcceptedDto);
  }
}
