import { Module } from '@nestjs/common';
import { BossController } from './boss.controller';
import { BossService } from './boss.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Boss } from 'src/entities/Boss';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Boss])],
  controllers: [BossController],
  providers: [BossService],
})
export class BossModule {}
