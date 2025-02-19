import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Summary } from './summary.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('increment')
  review_id!: number;

  @Column({ type: 'varchar', length: 255 })
  review_text!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Summary, (summary) => summary.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'summary_id' })
  summary!: Summary;
}