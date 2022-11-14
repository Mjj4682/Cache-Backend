import { Controller, Get } from '@nestjs/common';
import { BossService } from './boss.service';

@Controller('bossRaid')
export class BossController {
  constructor(private readonly bossService: BossService) {}

  @Get()
  raidStatus() {
    return this.bossService.raidStatus();
  }
}
