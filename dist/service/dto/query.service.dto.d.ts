import { FindQuery } from 'src/common/types';
export declare class QueryOfferedDto extends FindQuery {
    type?: string;
    price?: number;
    country?: string;
    city?: string;
    quarter?: string;
}
