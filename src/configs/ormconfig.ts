import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Boss } from '../entities/Boss';
import { Users } from '../entities/Users';
import * as dotenv from 'dotenv';

dotenv.config();
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Boss],
  synchronize: false,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};
