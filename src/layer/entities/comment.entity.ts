import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Summary } from './summary.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  comment_id!: number;

  @Column({ type: 'bigint', nullable: true })
  comment_parent_id!: number | null;  // 부모 댓글이 있을 수 있음

  @Column({ type: 'text' })
  comment_text!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Summary, (summary) => summary.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'summary_id' })
  summary!: Summary;
}