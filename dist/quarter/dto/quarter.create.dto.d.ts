declare class InnerArrayDto {
  coordinates: [number, number];
}
export declare class CreateQuarterDto {
  name: string;
  location: object;
  city: string;
  country: string;
  coordinates: InnerArrayDto[];
}
export {};
