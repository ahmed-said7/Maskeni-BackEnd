declare class InnerArrayDto {
    coordinates: [number, number];
}
export declare class CreateCountryDto {
    name: string;
    location: object;
    coordinates: InnerArrayDto[];
}
export {};
