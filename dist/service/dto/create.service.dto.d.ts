import { ValidateLocation } from 'src/common/types';
export declare class CreateOfferedDto {
    name: string;
    details: string;
    type: string;
    location: ValidateLocation;
    images: string;
    user: string;
    price: number;
}
