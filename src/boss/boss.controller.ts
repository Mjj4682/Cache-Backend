import { Controller, Get, Post, Body } from '@nestjs/common';
import { BossService } from './boss.service';

@Controller('bossRaid')
export class BossController {
  constructor(private readonly bossService: BossService) {}

  @Get()
  raidStatus() {
    return this.bossService.raidStatus();
  }

  @Post('enter')
  enterRaid(@Body() data: number) {
    return this.bossService.enterRaid(data);
  }
}
