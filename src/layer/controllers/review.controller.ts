import { Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';
import { ResponseDto } from '../dtos/response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: '리뷰 생성', description: '컨텐츠에 대한 리뷰를 생성합니다.' })
  @ApiResponse({ status: 201, description: '리뷰 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    const result = await this.reviewService.createReview(createReviewDto);
    return new ResponseDto(201, '리뷰 생성 성공', result);
  }

  @Get(':content_id')
  @ApiOperation({ summary: '컨텐츠 리뷰 조회', description: '특정 컨텐츠에 대한 리뷰 목록을 조회합니다.' })
  @ApiResponse({ status: 200, description: '리뷰 조회 성공' })
  async getReviews(@Param('content_id', ParseIntPipe) content_id: number) {
    const result = await this.reviewService.getReviewsByContent(content_id);
    return new ResponseDto(200, '리뷰 조회 성공', result);
  }

  @Patch(':review_id')
  @ApiOperation({ summary: '리뷰 수정', description: '특정 리뷰를 수정합니다.' })
  @ApiResponse({ status: 200, description: '리뷰 수정 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async updateReview(
    @Param('review_id', ParseIntPipe) review_id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const result = await this.reviewService.updateReview(review_id, updateReviewDto);
    return new ResponseDto(200, '리뷰 수정 성공', result);
  }

  @Delete(':review_id')
  @ApiOperation({ summary: '리뷰 삭제', description: '특정 리뷰를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '리뷰 삭제 성공' })
  async deleteReview(@Param('review_id', ParseIntPipe) review_id: number) {
    await this.reviewService.deleteReview(review_id);
    return new ResponseDto(200, '리뷰 삭제 성공', null);
  }
}
