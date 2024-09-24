import { Controller, Delete, Param } from '@nestjs/common';
import { SoftRemoveService } from './soft-remove.service';

@Controller('soft-remove')
export class SoftRemoveController {
  constructor(private readonly softRemoveService: SoftRemoveService) {}

  @Delete('questions/:id')
  async softRemoveQuestion(@Param('id') id: string) {
    return this.softRemoveService.softRemoveQuestions(id);
  }

  @Delete('events/:id')
  async softRemoveEvent(@Param('id') id: string) {
    return this.softRemoveService.softRemoveEvents(id);
  }

  @Delete('shares/:id')
  async softRemoveShare(@Param('id') id: string) {
    return this.softRemoveService.softRemoveShares(id);
  }

  @Delete('voluntary/:id')
  async softRemoveVoluntary(@Param('id') id: string) {
    return this.softRemoveService.softRemoveVoluntary(id);
  }

  @Delete('services/:id')
  async softRemoveOfferedService(@Param('id') id: string) {
    return this.softRemoveService.softRemoveService(id);
  }

  @Delete('posts/:id')
  async softRemovePost(@Param('id') id: string) {
    return this.softRemoveService.softRemovePosts(id);
  }
}
