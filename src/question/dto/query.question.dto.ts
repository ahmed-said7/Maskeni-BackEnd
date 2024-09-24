import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryQuestionDto extends FindQuery {
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'The optional ID of the user who created the questions.',
    type: String,
  })
  user: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'The optional ID of the country to filter questions by.',
    type: String,
  })
  country: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'The optional ID of the city to filter questions by.',
    type: String,
  })
  city: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    description: 'The optional ID of the quarter to filter questions by.',
    type: String,
  })
  quarter: string;
}
