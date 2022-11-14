import { Injectable } from '@nestjs/common';
import { Boss } from '../entities/Boss';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BossService {
  constructor(
    @InjectRepository(Boss)
    private bossRepository: Repository<Boss>,
  ) {}

  async raidStatus() {
    const a = await this.bossRepository
      .createQueryBuilder('boss')
      .innerJoin('boss.userId', 'users')
      .select(['boss.canEnter as canEnter', 'users.id as enteredUserId'])
      .orderBy({ 'boss.id': 'DESC' })
      .getRawOne();
    return a;
  }
}
