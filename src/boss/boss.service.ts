import { BadRequestException, Injectable } from '@nestjs/common';
import { Boss } from '../entities/Boss';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterRaidDto, EndRaidDto } from '../dto/raid.dto';
import { CachingService } from 'src/caching/caching.service';

@Injectable()
export class BossService {
  private readonly URL: string =
    'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json';
  constructor(
    @InjectRepository(Boss)
    private bossRepository: Repository<Boss>,
    private cacheManager: CachingService,
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
    let apiInfo = '';
    await fetch(this.URL)
      .then((response) => response.json())
      .then((datas) => (apiInfo = datas.bossRaids[0]));
    await this.cacheManager.set(
      'bossRaidLimitSeconds',
      apiInfo['bossRaidLimitSeconds'],
      3600,
    );
    await this.cacheManager.set('0', apiInfo['levels'][0].score, 3600);
    await this.cacheManager.set('1', apiInfo['levels'][1].score, 3600);
    await this.cacheManager.set('2', apiInfo['levels'][2].score, 3600);
    const score = await this.cacheManager.get(String(data.level));
    // const time = await this.cacheManager.get('bossRaidLimitSeconds'); 미구현
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
    boss.score = score;
    boss.userId = data.userId;
    await this.bossRepository.save(boss);
    const bossId = await this.bossRepository.findOne({
      select: { id: true },
      where: { id: boss.id },
    });
    const obj = { ...bossId, isEntered: true };
    return obj;
  }

  async endRaid(data: EndRaidDto) {
    const raidUpdate = await this.bossRepository
      .createQueryBuilder('boss')
      .innerJoin('boss.userId', 'users')
      .where(`boss.userId = ${data.userId}`)
      .getRawOne();
    if (!raidUpdate) {
      throw new BadRequestException('userId error');
    }
    const newRaid = await this.bossRepository.findOneBy({ id: data.id });
    newRaid.canEnter = true;
    await this.bossRepository.save(newRaid);
  }
}
