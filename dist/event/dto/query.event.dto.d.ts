import { FindQuery } from 'src/common/types';
export declare class QueryEventDto extends FindQuery {
    date: string;
    startedAt: string;
    endedAt: string;
    startAge: number;
    endAge: number;
    type: string;
    price: number | object;
    country: string;
    city: string;
    quarter: string;
}
