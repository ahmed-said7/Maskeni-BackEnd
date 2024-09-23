import { Query } from 'mongoose';
export interface SearchQuery extends Query<any, any[] | any> {
    skipFilter?: boolean;
}
export declare class ShareModule {
}
