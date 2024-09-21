import { ValidateLocation } from 'src/common/types';
export declare class CreateEventDto {
    name: string;
    details: string;
    location: ValidateLocation;
    startedAt: string;
    date: string;
    endedAt: string;
    images: string;
    startAge: number;
    endAge: number;
    user: string;
    price: number;
}
