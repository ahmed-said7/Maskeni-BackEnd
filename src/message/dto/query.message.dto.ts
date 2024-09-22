import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class QueryMessageDto {
  @IsNumber()
  @Min(2)
  @ApiProperty()
  page: number;
  @IsDateString()
  @ApiProperty()
  after: string;
}
