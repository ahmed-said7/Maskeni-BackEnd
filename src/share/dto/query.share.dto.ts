import { IsOptional, IsString } from 'class-validator';
import { FindQuery } from 'src/common/types';

export class QueryShareDto extends FindQuery {
  @IsOptional()
  @IsString()
  user: string;
}
