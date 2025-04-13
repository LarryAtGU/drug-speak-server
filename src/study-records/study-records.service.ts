// src/study-record/study-record.services.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyRecord } from './entities/study-records.entity';
import { UpdateStudyRecordDto } from './dto/update-study-records.dto';

@Injectable()
export class StudyRecordService {
  constructor(
    @InjectRepository(StudyRecord)
    private readonly studyRecordRepository: Repository<StudyRecord>,
  ) {}

  // Upsert (insert or update) a user's study record
  async upsertRecord(
    userId: string,
    updateDto: UpdateStudyRecordDto,
  ): Promise<StudyRecord> {
    // Check if a record already exists
    let record = await this.studyRecordRepository.findOne({
      where: { userId },
    });
    if (record) {
      // Update existing record with provided data
      record = { ...record, ...updateDto };
    } else {
      // Create a new record for the user
      record = this.studyRecordRepository.create({ userId, ...updateDto });
    }
    return await this.studyRecordRepository.save(record);
  }

  // Retrieve a specific user's study record (including username from User)
  async getRecord(userId: string): Promise<StudyRecord> {
    const record = await this.studyRecordRepository.findOne({
      where: { userId },
      relations: ['user'],
    });
    if (!record) {
      throw new NotFoundException(`Study record for user ${userId} not found`);
    }
    return record;
  }

  // Retrieve all study records (with joined User info)
  async getAllRecords(): Promise<StudyRecord[]> {
    await new Promise((res) => {
      setTimeout(() => res(1), 2000);
    });
    return await this.studyRecordRepository.find({
      relations: ['user'],
    });
  }
}
