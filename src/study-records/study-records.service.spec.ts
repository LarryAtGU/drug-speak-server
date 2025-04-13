// study-records.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudyRecordService } from './study-records.service';
import { StudyRecord } from './entities/study-records.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('StudyRecordService', () => {
  let service: StudyRecordService;

  // Create a simple mock for the StudyRecord repository.
  const mockStudyRecordRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudyRecordService,
        {
          provide: getRepositoryToken(StudyRecord),
          useValue: mockStudyRecordRepository,
        },
      ],
    }).compile();

    service = module.get<StudyRecordService>(StudyRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
