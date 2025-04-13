// src/study-record/dto/update-study-records.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudyRecordDto {
  @ApiProperty({
    required: false,
    description: 'The number of drugs in the users current learning list.',
    example: 3,
  })
  currentLearning?: number;

  @ApiProperty({
    required: false,
    description: 'The number of drugs in the users finished list.',
    example: 2,
  })
  finishedLearning?: number;

  @ApiProperty({
    required: false,
    description: 'The total score the user is gained.',
    example: 278,
  })
  totalScore?: number;
}
