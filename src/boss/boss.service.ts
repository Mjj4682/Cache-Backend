import { BadRequestException, Injectable } from '@nestjs/common';
import { Boss } from '../entities/Boss';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterRaidDto, EndRaidDto } from '../dto/raid.dto';

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

  async enterRaid(data: EnterRaidDto) {
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

  async endRaid(data: EndRaidDto) {
    const raidUpdate = await this.bossRepository
      .createQueryBuilder('boss')
      .innerJoin('boss.userId', 'users')
      .where(`boss.userId = ${data.userId}`)
      .getRawOne();
    console.log(raidUpdate);
    if (!raidUpdate) {
      throw new BadRequestException('userId error');
    }
    const newRaid = await this.bossRepository.findOneBy({ id: data.id });
    newRaid.canEnter = true;
    await this.bossRepository.save(newRaid);
  }
}
