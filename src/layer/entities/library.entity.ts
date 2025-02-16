import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('library')
export class Library {
  @PrimaryGeneratedColumn('increment')
  library_id!: number;

  @ManyToOne(() => User, (user) => user.libraries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}