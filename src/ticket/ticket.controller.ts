import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { QueryTicketDto } from './dto/query.ticket.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}
  @Get(':ticketId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getTicket(@Param('ticketId', ValidateObjectIdPipe) ticketId: string) {
    return this.ticketService.getTicket(ticketId);
  }
  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllTickets(@Query() query: QueryTicketDto, @Req() req: any) {
    return this.ticketService.getTickets(query, req.userId);
  }
  @Post(':eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  create(
    @Param('eventtId', ValidateObjectIdPipe) ticketId: string,
    @Req() req: any,
    @Body('quantity') quantity: number,
  ) {
    return this.ticketService.createTicket(ticketId, quantity, req.userId);
  }
}
