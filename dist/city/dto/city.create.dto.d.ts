declare class InnerArrayDto {
    coordinates: [number, number];
}
export declare class CreateCityDto {
    name: string;
    location: object;
    coordinates: InnerArrayDto[];
    country: string;
}
export {};
