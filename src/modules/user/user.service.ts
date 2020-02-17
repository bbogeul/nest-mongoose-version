import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '../../core';
import { User } from './user.interface';
import { MODELS } from '../../shared';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService extends BaseService {
  constructor(
    @Inject(MODELS.USER_MODEL) private readonly userModel: Model<User>,
  ) {
    super();
  }

  /**
   * find user
   */
  async find() {
    return await this.userModel.find();
  }
}
