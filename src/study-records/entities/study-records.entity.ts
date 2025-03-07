// src/study-record/entities/study-records.entity.ts
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class StudyRecord {
  // Use userId as the primary key so that each user has at most one study record.
  @PrimaryColumn()
  userId: string;

  @Column({ default: 0 })
  currentLearning: number;

  @Column({ default: 0 })
  finishedLearning: number;

  @Column({ default: 0 })
  totalScore: number;

  // Define a one-to-one relationship to the User entity.
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
