import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender } from '../types/types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-enum',
    enum: Gender,
  })
  gender: Gender;
}
