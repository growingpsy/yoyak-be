import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Content } from './content.entity';  
import { User } from './user.entity';  
import { Highlight } from './highlight.entity';
import { LikeDislike } from './likeDislike.entity';
import { Review } from './review.entity';
import { Comment } from './comment.entity';

@Entity('summary')
export class Summary {
  @PrimaryGeneratedColumn('increment')
  summary_id!: number;  

  @Column({ type: 'text' })
  summary_text!: string;  

  @Column({ type: 'tinyint', width: 1 })
  is_long!: boolean;  

  @Column({ type: 'tinyint', width: 1 })
  contains_spoiler!: boolean;  

  @Column({ type: 'datetime' })
  created_at!: Date;  

  @Column({ type: 'datetime' })
  updated_at!: Date;  

  @ManyToOne(() => Content)
  @JoinColumn({ name: 'content_id' })
  content!: Content;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Highlight, (highlight) => highlight.summary)
  highlights!: Highlight[];

  @OneToMany(() => LikeDislike, (likeDislike) => likeDislike.summary, { cascade: true })
likeDislikes!: LikeDislike[];

@OneToMany(() => Review, (review) => review.summary)
reviews!: Review[];

@OneToMany(() => Comment, (comment) => comment.summary)
comments!: Comment[];
}
