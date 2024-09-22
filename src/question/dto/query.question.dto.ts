import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryQuestionDto extends FindQuery {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  user: string;
}
