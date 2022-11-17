import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users } from './entities/Users';
import { Boss } from './entities/Boss';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/ormconfig';
import { BossModule } from './boss/boss.module';
import { CachingModule } from './caching/caching.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Users,
    Boss,
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    BossModule,
    CachingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
