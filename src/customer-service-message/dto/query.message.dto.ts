import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, Min } from 'class-validator';

export class QueryMessageDto {
  @IsNumber()
  @Min(2)
  @ApiProperty({
    description: 'The page number for pagination, must be at least 2',
    example: 2,
  })
  page: number;

  @IsDateString()
  @ApiProperty({
    description:
      'Date in ISO format, messages after this date will be retrieved',
    example: '2024-09-01T00:00:00Z',
  })
  after: string;
}
