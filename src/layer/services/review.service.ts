// review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';
import { ReviewRepository } from '../repositories/review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  // 리뷰 생성
  async createReview(createReviewDto: CreateReviewDto) {
    return await this.reviewRepository.create(createReviewDto);
  }

  // 특정 콘텐츠의 리뷰 가져오기
  async getReviewsByContent(content_id: number) {
    return await this.reviewRepository.findByContent(content_id);
  }

  // 리뷰 수정
  async updateReview(review_id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne(review_id);
    if (!review) throw new NotFoundException('리뷰를 찾을 수 없습니다.');

    return await this.reviewRepository.update(review_id, updateReviewDto);
  }

  // 리뷰 삭제
  async deleteReview(review_id: number) {
    const review = await this.reviewRepository.findOne(review_id);
    if (!review) throw new NotFoundException('리뷰를 찾을 수 없습니다.');

    await this.reviewRepository.delete(review_id);
    return { message: '리뷰가 삭제되었습니다.' };
  }
}
