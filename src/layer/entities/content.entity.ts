import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'datetime' })
  created_at!: Date; 
}