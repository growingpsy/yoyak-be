import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

export enum ContentType {
  BOOK = 'book',
  DRAMA = 'drama',
  MOVIE = 'movie',
}

@Entity('content')
export class Content {
  @PrimaryGeneratedColumn('increment')
  content_id!: number;

  @Column({ type: 'varchar', length: 255 })
  content_title!: string;

  @Column({ type: 'enum', enum: ContentType })
  content_type!: ContentType;

  @Column({ type: 'varchar', length: 255 })
  content_genre!: string;

  @Column({ type: 'text' })
  content_plot!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Review, (review) => review.content, { cascade: true })
  reviews!: Review[];
}
