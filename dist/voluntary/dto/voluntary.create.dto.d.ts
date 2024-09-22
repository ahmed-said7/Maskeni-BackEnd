import { ValidateLocation } from 'src/common/types';
export declare class CreateVoluntaryDto {
    name: string;
    details: string;
    startedAt: string;
    date: string;
    endedAt: string;
    location: ValidateLocation;
    images: string;
    startAge: number;
    endAge: number;
    user: string;
}
