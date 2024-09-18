import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { QueryTicketDto } from './dto/query.ticket.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}
  @Get(':ticketId')
  getTicket(@Param('ticketId', ValidateObjectIdPipe) ticketId: string) {
    return this.ticketService.getTicket(ticketId);
  }
  @Get()
  getAllTickets(@Query() query: QueryTicketDto, @Req() req: any) {
    return this.ticketService.getTickets(query, req.userId);
  }
  @Post(':ticketId')
  create(
    @Param('ticketId', ValidateObjectIdPipe) ticketId: string,
    @Req() req: any,
  ) {
    return this.ticketService.createTicket(ticketId, req.userId);
  }
}
