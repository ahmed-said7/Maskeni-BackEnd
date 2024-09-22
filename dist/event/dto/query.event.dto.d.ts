import { FindQuery } from 'src/common/types';
export declare class QueryEventDto extends FindQuery {
  date: Date;
  startedAt: Date;
  endedAt: Date;
  startAge: number;
  endAge: number;
  type: string;
  price: number | object;
}
