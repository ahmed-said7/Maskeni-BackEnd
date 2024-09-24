import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class QueryMessageDto {
  @IsNumber()
  @Min(2)
  @ApiProperty({
    description: 'The page number for pagination, minimum value is 2',
  })
  page: number;

  @IsDateString()
  @ApiProperty({ description: 'Fetch messages after this date' })
  after: string;
}
