// src/study-record/study-record.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRecord } from './entities/study-records.entity';
import { StudyRecordService } from './study-records.service';
import { StudyRecordController } from './study-records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudyRecord])],
  providers: [StudyRecordService],
  controllers: [StudyRecordController],
})
export class StudyRecordModule {}
