import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { BossService } from './boss.service';
import { EnterRaidDto, EndRaidDto } from '../dto/raid.dto';

@Controller('bossRaid')
export class BossController {
  constructor(private readonly bossService: BossService) {}

  @Get()
  raidStatus() {
    return this.bossService.raidStatus();
  }

  @Post('enter')
  enterRaid(@Body() data: EnterRaidDto) {
    return this.bossService.enterRaid(data);
  }

  @Patch('end')
  endRaid(@Body() data: EndRaidDto) {
    return this.bossService.endRaid(data);
  }
}
