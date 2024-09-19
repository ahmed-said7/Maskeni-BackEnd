import { IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryVoluntaryDto extends FindQuery {
  @IsOptional()
  date: Date;
  @IsOptional()
  startedAt: Date;
  @IsOptional()
  endedAt: Date;
  @IsOptional()
  startAge: number;
  @IsOptional()
  endAge: number;
  @IsOptional()
  type: string;
}
