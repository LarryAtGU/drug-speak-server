// src/study-record/study-records.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { StudyRecordService } from './study-records.service';
import { UpdateStudyRecordDto } from './dto/update-study-records.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('study-record')
export class StudyRecordController {
  constructor(private readonly studyRecordService: StudyRecordService) {}

  // Endpoint to insert or update a user's study record (requires authentication)
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

  // Endpoint to query study records:
  // If query parameter 'id' is provided, return that user's record;
  // otherwise, return all study records.
  @Get()
  async getStudyRecords(@Query('id') userId?: string) {
    if (userId) {
      return await this.studyRecordService.getRecord(userId);
    } else {
      return await this.studyRecordService.getAllRecords();
    }
  }
  @Get(':userId')
  async getStudyRecordById(@Param('userId') userId: string) {
    return await this.studyRecordService.getRecord(userId);
  }
}
