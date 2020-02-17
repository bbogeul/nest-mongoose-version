import * as mongoose from 'mongoose';
import { CONNECTIONS } from '../shared';

export const databaseProviders = [
  {
    provide: CONNECTIONS.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.createConnection(
        'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
        { useNewUrlParser: true, useUnifiedTopology: true },
      ),
  },
];
