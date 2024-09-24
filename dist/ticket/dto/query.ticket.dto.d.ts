import { FindQuery } from 'src/common/types';
export declare class QueryTicketDto extends FindQuery {
    eventOwner?: string;
    user?: string;
    event?: string;
    isPaid?: boolean;
}
