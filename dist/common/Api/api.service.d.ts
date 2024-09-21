import { Query } from 'mongoose';
export interface IQuery {
    page?: string;
    sort?: string;
    select?: string;
    limit?: string;
    keyword?: string;
}
export interface Pagination {
    currentPage?: number;
    previousPage?: number;
    nextPage?: number;
    numOfPages?: number;
    skip?: number;
    limit?: number;
    count?: number;
}
export declare class ApiService<T, I extends IQuery> {
    query: Query<T[], T>;
    private queryObj;
    paginationObj: Pagination;
    private filter;
    private sort;
    private search;
    private select;
    private pagination;
    getAllDocs(query: Query<T[], T>, queryObj: I, obj?: {}, fields?: string[]): Promise<{
        query: Query<T[], T>;
        paginationObj: Pagination;
    }>;
}
