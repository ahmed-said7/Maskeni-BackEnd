import { FindQuery } from 'src/common/types';
export declare class QueryOfferedDto extends FindQuery {
  type: string;
  price: number | object;
}
