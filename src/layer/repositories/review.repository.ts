// review.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from '../dtos/review.dto';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 리뷰 생성
 async create(createReviewDto: CreateReviewDto) {
  const { content_id, review_text } = createReviewDto;
  return this.prisma.review.create({
    data: {
      review_text,
      content: {
        connect: { content_id },
      },
    },
  });
}

  // 특정 콘텐츠의 리뷰 찾기
 async findByContent(content_id: number) {
  return this.prisma.review.findMany({
    where: {
      content: {
        content_id: content_id,
      },
    },
  });
}

  // 특정 리뷰 찾기
  async findOne(review_id: number) {
    return this.prisma.review.findUnique({
      where: { review_id },
    });
  }

  // 리뷰 업데이트
  async update(review_id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { review_id },
      data: updateReviewDto,
    });
  }

  // 리뷰 삭제
  async delete(review_id: number) {
    return this.prisma.review.delete({
      where: { review_id },
    });
  }
}
