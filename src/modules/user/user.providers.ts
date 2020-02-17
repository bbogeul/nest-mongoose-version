import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { MODELS, CONNECTIONS } from '../../shared';

export const usersProviders = [
  {
    provide: MODELS.USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('user', UserSchema),
    inject: [CONNECTIONS.DATABASE_CONNECTION],
  },
];
