import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHighlightDto } from '../dtos/highlight.dto';

@Injectable()
export class HighlightRepository {
  constructor(private prisma: PrismaService) {}

  // 하이라이트 저장
  async saveHighlight(createHighlightDto: CreateHighlightDto) {
    return this.prisma.highlight.create({
      data: {
        highlight_text: createHighlightDto.highlight_text,
        content_id: createHighlightDto.content_id,
        summary_id: createHighlightDto.summary_id!, // summary_id는 필수 필드
        review_id: createHighlightDto.review_id || null, // review_id는 선택적 필드
      },
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
      }, 
    });
  }

  // 모든 하이라이트 조회 (기본 정렬 - 컨텐츠 제목순)
  async findAllHighlights() {
    return this.prisma.highlight.findMany({
      include: {
        summary: true,
        content: true
      },
      orderBy: {
        content: {
          content_title: 'asc'
        }
      }
    }); 
  }

  // 작성일 순으로 하이라이트 조회
  async findHighlightsByDate() {
    return this.prisma.highlight.findMany({
      include: {
        content: true
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }
}
