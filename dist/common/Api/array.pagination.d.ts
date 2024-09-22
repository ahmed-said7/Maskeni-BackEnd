import { Pagination } from './api.service';
export declare class ArrayPagination {
    paginationObj: Pagination;
    apiPagination(query: {
        page?: string;
        limit?: string;
    }, data: Array<any>): {
        result: any[];
        pagination: Pagination;
    };
}
