import { BadRequestException, Injectable } from '@nestjs/common';
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
    const raidStatus = await this.bossRepository
      .createQueryBuilder('boss')
      .innerJoin('boss.userId', 'users')
      .select(['boss.canEnter as canEnter', 'users.id as enteredUserId'])
      .orderBy({ 'boss.id': 'DESC' })
      .getRawOne();
    return raidStatus;
  }

  async enterRaid(data: any) {
    const raidStatus = await this.bossRepository
      .createQueryBuilder('boss')
      .innerJoin('boss.userId', 'users')
      .select(['boss.canEnter as canEnter', 'users.id as enteredUserId'])
      .orderBy({ 'boss.id': 'DESC' })
      .getRawOne();
    if (raidStatus.canEnter === 0) {
      throw new BadRequestException('isEntered : false');
    }
    const boss = new Boss();
    boss.level = data.level;
    boss.userId = data.userId;
    await this.bossRepository.save(boss);
    const userId = await this.bossRepository.findOne({
      select: { id: true },
      where: { id: boss.id },
    });
    const obj = { ...userId, isEntered: true };
    return obj;
  }
}
