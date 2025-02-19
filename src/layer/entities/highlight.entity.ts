import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Summary } from './summary.entity';

@Entity('highlight')
export class Highlight {
  @PrimaryGeneratedColumn('increment')
  highlight_id!: number;

  @Column({ type: 'text' })
  highlight_text!: string; 

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date; 

  @ManyToOne(() => Summary, (summary) => summary.highlights, { onDelete: 'CASCADE' })
  summary!: Summary; 
}