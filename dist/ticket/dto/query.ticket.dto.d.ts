import { FindQuery } from 'src/common/types';
export declare class QueryTicketDto extends FindQuery {
    owner: string;
    user: string;
    event: string;
    isPaid: boolean;
}
