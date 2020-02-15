import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATBASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
      ),
  },
];
