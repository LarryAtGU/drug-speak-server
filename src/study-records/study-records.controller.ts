// src/study-record/study-records.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  // Query,
  Param,
} from '@nestjs/common';
import { StudyRecordService } from './study-records.service';
import { UpdateStudyRecordDto } from './dto/update-study-records.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Study Records')
@Controller('study-record')
export class StudyRecordController {
  constructor(private readonly studyRecordService: StudyRecordService) {}

  // Endpoint to insert or update a user's study record (requires authentication)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a user's study record." })
  @ApiResponse({
    status: 201,
    description: "User's study record updated successfully.",
    schema: {
      example: {
        userId: '2dd5a455-20d3-4987-ad74-89885c744ad1',
        currentLearning: 3,
        finishedLearning: 2,
        totalScore: 278,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, you need to login to access this function.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async upsertStudyRecord(
    @Request() req,
    @Body() updateDto: UpdateStudyRecordDto,
  ) {
    // Get the authenticated user's id from the request (populated by JwtAuthGuard)
    const userId = req.user.id;
    return await this.studyRecordService.upsertRecord(userId, updateDto);
  }

  @ApiOperation({ summary: 'Get all users study records.' })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          userId: 'bc988245-ce8d-491a-8142-4e0697e3bba6',
          currentLearning: 3,
          finishedLearning: 5,
          totalScore: 75,
          user: {
            id: 'bc988245-ce8d-491a-8142-4e0697e3bba6',
            username: 'newNamexx',
            email: 'john@example.com',
            gender: 'male',
          },
        },
        {
          userId: '152e3dc3-b4ee-46e0-ac5d-d14d32ccb8b2',
          currentLearning: 5,
          finishedLearning: 0,
          totalScore: 65,
          user: {
            id: '152e3dc3-b4ee-46e0-ac5d-d14d32ccb8b2',
            username: 'New Test',
            email: 'test2@test.au',
            gender: 'female',
          },
        },
      ],
    },
  })
  @Get()
  async getStudyRecords() {
    return await this.studyRecordService.getAllRecords();
  }

  // Endpoint to query study records:
  // If query parameter 'id' is provided, return that user's record;
  // otherwise, return all study records.

  // async getStudyRecords(@Query('id') userId?: string) {
  //   if (userId) {
  //     return await this.studyRecordService.getRecord(userId);
  //   } else {
  //     return await this.studyRecordService.getAllRecords();
  //   }
  // }

  @ApiOperation({ summary: "Get a user's study record." })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'UserID',
    type: String,
    example: 'bc988245-ce8d-491a-8142-4e0697e3bba6',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        userId: 'bc988245-ce8d-491a-8142-4e0697e3bba6',
        currentLearning: 3,
        finishedLearning: 5,
        totalScore: 75,
        user: {
          id: 'bc988245-ce8d-491a-8142-4e0697e3bba6',
          username: 'newNamexx',
          email: 'john@example.com',
          gender: 'male',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Get(':userId')
  async getStudyRecordById(@Param('userId') userId: string) {
    return await this.studyRecordService.getRecord(userId);
  }
}
