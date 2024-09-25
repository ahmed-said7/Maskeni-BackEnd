declare class InnerArrayDto {
    coordinates: [number, number];
}
export declare class CreateCountryDto {
    nameAr: string;
    nameEn: string;
    image: string;
    location: object;
    coordinates: InnerArrayDto[];
}
export {};
