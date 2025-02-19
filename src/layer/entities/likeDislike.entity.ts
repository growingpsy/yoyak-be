import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Summary } from './summary.entity';

@Entity('like_dislike')
export class LikeDislike {
  @PrimaryGeneratedColumn('increment')
  like_id!: number;

  @PrimaryGeneratedColumn('increment')
  dislike_id!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @ManyToOne(() => Summary, (summary) => summary.likeDislikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'summary_id' })
  summary!: Summary;
}