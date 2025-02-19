import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Summary } from './summary.entity';        

@Entity('bookmark')
export class Bookmark {
  @PrimaryGeneratedColumn('increment')
  bookmark_id!: number;

  @Column({ type: 'datetime' })
  created_at!: Date;

  @ManyToOne(() => Summary)
  @JoinColumn({ name: 'summary_id' })
  summary!: Summary;

  @Column()
  summary_id!: number;
}
