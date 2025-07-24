import { Controller, Post, Delete, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { HighlightService } from '../services/highlight.service';
import { CreateHighlightDto } from '../dtos/highlight.dto';
import { ResponseDto } from '../dtos/response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Highlight')
@Controller('highlights')
export class HighlightController {
  constructor(private readonly highlightService: HighlightService) {}

  @Post('summary/:summary_id')
  @ApiOperation({ summary: '요약문 하이라이트 저장', description: '특정 요약문의 하이라이트를 저장합니다.' })
  @ApiResponse({ status: 201, description: '하이라이트 저장 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async highlightSummary(@Param('summary_id', ParseIntPipe) summary_id: number, @Body() createHighlightDto: CreateHighlightDto) {
    const result = await this.highlightService.highlightSummary(summary_id, createHighlightDto);
    return new ResponseDto(201, '하이라이트 저장 성공', result);
  }

  @Post('review/:review_id')
  @ApiOperation({ summary: '리뷰 하이라이트 저장', description: '특정 리뷰의 하이라이트를 저장합니다.' })
  @ApiResponse({ status: 201, description: '하이라이트 저장 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async highlightReview(@Param('review_id', ParseIntPipe) review_id: number, @Body() createHighlightDto: CreateHighlightDto) {
    const result = await this.highlightService.highlightReview(review_id, createHighlightDto);
    return new ResponseDto(201, '하이라이트 저장 성공', result);
  }

  @Delete('summary/:summary_id')
  @ApiOperation({ summary: '요약문 하이라이트 취소', description: '특정 요약문의 하이라이트를 취소합니다.' })
  @ApiResponse({ status: 200, description: '하이라이트 취소 성공' })
  async unhighlightSummary(@Param('summary_id', ParseIntPipe) summary_id: number) {
    await this.highlightService.unhighlightSummary(summary_id);
    return new ResponseDto(200, '하이라이트 취소 성공', null);
  }

  @Delete('review/:review_id')
  @ApiOperation({ summary: '리뷰 하이라이트 취소', description: '특정 리뷰의 하이라이트를 취소합니다.' })
  @ApiResponse({ status: 200, description: '하이라이트 취소 성공' })
  async unhighlightReview(@Param('review_id', ParseIntPipe) review_id: number) {
    await this.highlightService.unhighlightReview(review_id);
    return new ResponseDto(200, '하이라이트 취소 성공', null);
  }

  @Get()
  @ApiOperation({ summary: '하이라이트 전체 조회(컨텐츠 제목순)', description: '모든 하이라이트를 컨텐츠 제목순으로 조회합니다.' })
  @ApiResponse({ status: 200, description: '하이라이트 조회 성공' })
  async getAllHighlights() {
    const result = await this.highlightService.getAllHighlights();
    return new ResponseDto(200, '하이라이트 조회 성공', result);
  }

  @Get('order')
  @ApiOperation({ summary: '하이라이트 작성일 순 조회', description: '하이라이트를 작성일 순으로 조회합니다.' })
  @ApiResponse({ status: 200, description: '하이라이트 조회 성공' })
  async getHighlightsByDate() {
    const result = await this.highlightService.getHighlightsByDate();
    return new ResponseDto(200, '하이라이트 작성일 순 조회 성공', result);
  }
}
