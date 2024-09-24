import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindQuery } from 'src/common/types';

export class QueryTicketDto extends FindQuery {
  @ApiPropertyOptional({ description: 'ID of the event owner' }) // Adding description for Swagger
  @IsOptional()
  eventOwner?: string;

  @ApiPropertyOptional({
    description: 'ID of the user associated with the ticket',
  }) // Adding description for Swagger
  @IsOptional()
  user?: string;

  @ApiPropertyOptional({
    description: 'ID of the event associated with the ticket',
  }) // Adding description for Swagger
  @IsOptional()
  event?: string;

  @ApiPropertyOptional({
    description: 'Indicates if the ticket is paid or not',
  }) // Adding description for Swagger
  @IsOptional()
  isPaid?: boolean;
}
