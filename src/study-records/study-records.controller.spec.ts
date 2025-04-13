import { Test, TestingModule } from '@nestjs/testing';
import { StudyRecordController } from './study-records.controller';
import { StudyRecordService } from './study-records.service';

describe('StudyRecordController', () => {
  let controller: StudyRecordController;
  const mockStudyRecordService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyRecordController],
      providers: [
        { provide: StudyRecordService, useValue: mockStudyRecordService },
      ],
    }).compile();

    controller = module.get<StudyRecordController>(StudyRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
