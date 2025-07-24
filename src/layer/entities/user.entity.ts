import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Library } from './library.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id!: number;  

  @Column({ type: 'varchar', length: 50 })
  user_name!: string;

  @Column({ type: 'varchar', length: 50 })
  user_nick!: string;

  @Column({ type: 'varchar', length: 255 })
  user_email!: string;

  @Column({ type: 'tinyint', default: 0 })
  email_verified!: boolean;

  @Column({ type: 'varchar', length: 100 })
  user_pwd!: string;

  @Column({ type: 'bigint', default: 0 })
  ban_count!: number;

  @Column({ type: 'datetime' })
  created_at!: Date;

  @Column({ type: 'datetime' })
  updated_at!: Date;

  @OneToMany(() => Library, (library) => library.user, { cascade: true })
  libraries!: Library[];
}