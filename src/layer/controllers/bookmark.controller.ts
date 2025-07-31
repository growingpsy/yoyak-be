import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BookmarkService } from '../services/bookmark.service';
import { CreateBookmarkDto } from '../dtos/bookmark.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from '../dtos/response.dto';

@ApiTags('bookmarks')
@ApiBearerAuth('access-token')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '북마크 추가' })
  @ApiResponse({ status: 201, description: '북마크 추가 성공', type: Object })
  async create(
    @Body() dto: CreateBookmarkDto,
    @Req() req,
  ) {
    const userId = req.user.user_id;
    console.log('북마크 추가 요청:', { userId, body: dto });

    const result = await this.bookmarkService.create(userId, dto);
    return new ResponseDto(201, '북마크 추가 성공', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':summary_id')
  @ApiOperation({ summary: '북마크 삭제' })
  @ApiResponse({ status: 200, description: '북마크 삭제 성공', type: Object })
  async delete(
    @Param('summary_id', ParseIntPipe) summaryId: number,
    @Req() req,
  ) {
    const userId = req.user.user_id;
    console.log('북마크 삭제 요청:', { userId, summaryId });

    const result = await this.bookmarkService.delete(userId, summaryId);
    return new ResponseDto(200, '북마크 삭제 성공', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '내 북마크 목록 조회' })
  @ApiResponse({ status: 200, description: '북마크 목록 조회 성공', type: [Object] })
  async findAll(@Req() req) {
    const userId = req.user.user_id;
    console.log('내 북마크 목록 조회 요청:', { userId });

    const result = await this.bookmarkService.findAllByUser(userId);
    return new ResponseDto(200, '북마크 목록 조회 성공', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':summary_id')
  @ApiOperation({ summary: '특정 요약 북마크 조회' })
  @ApiResponse({ status: 200, description: '특정 북마크 조회 성공', type: Object })
  async findOne(
    @Param('summary_id', ParseIntPipe) summaryId: number,
    @Req() req,
  ) {
    const userId = req.user.user_id;
    console.log('🔍 특정 북마크 조회 요청:', { userId, summaryId });

    const result = await this.bookmarkService.findOneByUserAndSummary(userId, summaryId);
    return new ResponseDto(200, '특정 북마크 조회 성공', result);
  }
}