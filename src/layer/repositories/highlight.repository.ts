import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHighlightDto } from '../dtos/highlight.dto';

@Injectable()
export class HighlightRepository {
  constructor(private prisma: PrismaService) {}

  // 하이라이트 저장
  async saveHighlight(createHighlightDto: CreateHighlightDto) {
    return this.prisma.highlight.create({
      data: createHighlightDto,  // Create data using Prisma
    });
  }

  // 하이라이트 삭제 (summary_id로 삭제)
  async deleteHighlightBySummary(summary_id: number) {
    return this.prisma.highlight.deleteMany({
      where: { summary_id },  
    });
  }

  // 하이라이트 삭제 (review_id로 삭제)
  async deleteHighlightByReview(review_id: number) {
    return this.prisma.highlight.deleteMany({
      where: { 
        review_id: review_id
      } as any, 
    });
  }

  // 모든 하이라이트 조회
  async findAllHighlights() {
    return this.prisma.highlight.findMany(); 
  }

  // 작성일 순으로 하이라이트 조회
  async findHighlightsByDate() {
    return this.prisma.highlight.findMany({
      orderBy: {
        created_at: 'asc',
      },
    });
  }
}
