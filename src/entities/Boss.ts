import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';

@Entity({ schema: 'wantedpro5', name: 'boss' })
export class Boss {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'score', default: 0 })
  score: number;

  @Column('boolean', { name: 'canEnter', default: true })
  canEnter: boolean;

  @CreateDateColumn()
  enterTime: Date;

  @UpdateDateColumn()
  endTime: Date;

  @ManyToOne(() => Users, (users) => users.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  userId: Users;
}
