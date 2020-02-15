import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { MODELS, CONNECTIONS } from '../../shared';

export const UserProvider = [
  {
    provide: MODELS.USER_MODEL,
    userFactory: (connection: Connection) =>
      connection.model('user', UserSchema),
    inject: [CONNECTIONS.DATABASE_CONNECTION],
  },
];
