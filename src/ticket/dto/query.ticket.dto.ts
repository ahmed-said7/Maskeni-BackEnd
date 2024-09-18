import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryTicketDto extends FindQuery {
  @IsOptional()
  owner: string;
  @IsOptional()
  user: string;
  @IsOptional()
  event: string;
  @IsOptional()
  isPaid: boolean;
}
