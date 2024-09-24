import { Jop_Type } from 'src/common/types';
export declare class CreateOfferedDto {
    name: string;
    details: string;
    type: Jop_Type;
    country: string;
    city: string;
    quarter: string;
    images: string[];
    user?: string;
    price?: number;
}
