export interface Payload {
    userId?: string;
    role?: string;
    iat?: number;
    country?: string;
    city?: string;
    quarter?: string;
}
export declare class FindQuery {
    page?: string;
    limit?: string;
}
export declare enum Event_Type {
    community = "\u0645\u062C\u062A\u0645\u0639\u064A",
    cultural = "\u062B\u0642\u0627\u0641\u064A",
    art = "\u0641\u0646",
    youth = "\u0644\u0645\u0629 \u0634\u0628\u0627\u0628",
    food = "\u0637\u0639\u0627\u0645",
    education = "\u062A\u0639\u0644\u064A\u0645"
}
export declare enum Gender_Type {
    male = "\u0630\u0643\u0631",
    female = "\u0623\u0646\u062B\u0649",
    all = "\u0627\u0644\u0643\u0644"
}
export declare enum Jop_Type {
    deliveryService = "\u062E\u062F\u0645\u0629 \u062A\u0648\u0635\u064A\u0644",
    grocery = "\u0627\u0644\u0628\u0642\u0627\u0644\u0647",
    homeServices = "\u062E\u062F\u0645\u0627\u062A \u0645\u0646\u0632\u0644\u064A\u0647",
    education = "\u062A\u0639\u0644\u064A\u0645",
    pharmacyService = "\u062E\u062F\u0645\u0629 \u0635\u064A\u062F\u0644\u064A\u0647"
}
export declare class ValidateLocation {
    type: string;
    coordinates: number[];
}
