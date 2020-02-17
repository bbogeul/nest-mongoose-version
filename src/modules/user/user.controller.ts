import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core';
import { UserService } from './user.service';

@Controller()
@ApiBearerAuth()
@ApiTags('User', 'USER')

// TODO: create base controller for extensions
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  /**
   * get user list
   * TODO: USER LIST DTO
   */
  @Get('/users')
  async findAll() {
    return await this.userService.find();
  }
}
