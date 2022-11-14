import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser() {
    const user = new Users();
    await this.userRepository.save(user);
    return this.userRepository.findOne({
      select: { id: true },
      where: { id: user.id },
    });
  }

  getOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['boss'],
      select: {
        boss: {
          id: true,
          score: true,
          enterTime: true,
          endTime: true,
        },
      },
    });
  }
}
