import { Controller, Patch, Param, Body } from '@nestjs/common';
import { DashboardUpdateArchivedDto } from './dto/dashboard.query.dto';
import { SoftArchiveService } from './soft-archived.service';

@Controller('soft-archive')
export class SoftArchiveController {
  constructor(private readonly softArchiveService: SoftArchiveService) {}

  @Patch('questions/:id')
  async softArchiveQuestion(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveQuestions(id, updateArchivedDto);
  }

  @Patch('events/:id')
  async softArchiveEvent(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveEvents(id, updateArchivedDto);
  }

  @Patch('shares/:id')
  async softArchiveShare(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveShares(id, updateArchivedDto);
  }

  @Patch('voluntary/:id')
  async softArchiveVoluntary(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveVoluntary(id, updateArchivedDto);
  }

  @Patch('services/:id')
  async softArchiveOfferedService(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveService(id, updateArchivedDto);
  }

  @Patch('posts/:id')
  async softArchivePost(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchivePosts(id, updateArchivedDto);
  }
}
