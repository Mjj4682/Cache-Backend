import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser() {
    return this.usersService.createUser();
  }

  @Get(':id')
  getOne(@Param('id') userId: number) {
    return this.usersService.getOne(userId);
  }
}
