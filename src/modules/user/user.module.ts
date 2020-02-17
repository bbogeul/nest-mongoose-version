import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../config';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...usersProviders],
  controllers: [],
  exports: [],
})
export class UserModule {}
