import { Module } from '@nestjs/common';
import { StudyRecordsService } from './study-records.service';
import { StudyRecordsController } from './study-records.controller';

@Module({
  providers: [StudyRecordsService],
  controllers: [StudyRecordsController]
})
export class StudyRecordsModule {}
