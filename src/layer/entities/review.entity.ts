import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Content } from './content.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('increment')
  review_id!: number;

  @Column({ type: 'varchar', length: 255 })
  review_text!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Content, (content) => content.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'content_id' })
  content!: Content;
}
