import { HydratedDocument } from 'mongoose';
export declare class City {
  name: string;
  location: {
    type: string;
    coordinates: [number, number][][];
  };
  isDeleted: boolean;
}
export type CityDocument = HydratedDocument<City>;
export declare const CitySchema: import('mongoose').Schema<
  City,
  import('mongoose').Model<
    City,
    any,
    any,
    any,
    import('mongoose').Document<unknown, any, City> &
      City & {
        _id: import('mongoose').Types.ObjectId;
      },
    any
  >,
  {},
  {},
  {},
  {},
  import('mongoose').DefaultSchemaOptions,
  City,
  import('mongoose').Document<
    unknown,
    {},
    import('mongoose').FlatRecord<City>
  > &
    import('mongoose').FlatRecord<City> & {
      _id: import('mongoose').Types.ObjectId;
    }
>;
