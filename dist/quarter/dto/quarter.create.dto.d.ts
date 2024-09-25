declare class InnerArrayDto {
    coordinates: [number, number];
}
export declare class CreateQuarterDto {
    nameAr: string;
    nameEn: string;
    image: string;
    location: object;
    city: string;
    country: string;
    coordinates: InnerArrayDto[];
}
export {};
