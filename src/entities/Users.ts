import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Boss } from './Boss';

@Entity({ schema: 'wantedpro5', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'totalScore', default: null })
  totalScore: number;

  @OneToMany(() => Boss, (boss) => boss.userId)
  boss: Boss[];
}
