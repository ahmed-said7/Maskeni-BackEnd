import { IsDateString, IsNumber, Min } from 'class-validator';

export class QueryMessageDto {
  @IsNumber()
  @Min(2)
  page: number;
  @IsDateString()
  after: string;
}
