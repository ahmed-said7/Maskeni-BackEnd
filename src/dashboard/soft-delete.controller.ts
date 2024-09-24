import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SoftDeleteService } from './soft-delete.service';
import { DashboardUpdateDeletedDto } from './dto/dashboard.query.dto';

@Controller('soft-delete')
export class SoftDeleteController {
  constructor(private readonly softDeleteService: SoftDeleteService) {}

  @Patch('questions/:id')
  async softDeleteQuestion(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteQuestions(id, updateDeletedDto);
  }

  @Patch('events/:id')
  async softDeleteEvent(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteEvents(id, updateDeletedDto);
  }

  @Patch('shares/:id')
  async softDeleteShare(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteShares(id, updateDeletedDto);
  }

  @Patch('voluntary/:id')
  async softDeleteVoluntary(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteVoluntary(id, updateDeletedDto);
  }

  @Patch('services/:id')
  async softDeleteOfferedService(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteService(id, updateDeletedDto);
  }

  @Patch('posts/:id')
  async softDeletePost(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeletePosts(id, updateDeletedDto);
  }
}
