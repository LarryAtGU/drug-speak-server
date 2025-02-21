import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Gender } from '../types/types';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'simple-enum',
    enum: Gender,
  })
  gender: Gender;
}
