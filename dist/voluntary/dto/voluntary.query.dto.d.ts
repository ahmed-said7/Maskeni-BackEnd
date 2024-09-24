import { FindQuery } from 'src/common/types';
export declare class QueryVoluntaryDto extends FindQuery {
    date?: string;
    user?: string;
    startedAt?: string;
    endedAt?: string;
    startAge?: number;
    endAge?: number;
    type?: string;
    country?: string;
    city?: string;
    quarter?: string;
}
