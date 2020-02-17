import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../config';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...usersProviders],
  controllers: [UserController],
  //   exports: [],
})
export class UserModule {}
