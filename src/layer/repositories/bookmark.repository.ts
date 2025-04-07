import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBookmarkDto } from '../dtos/bookmark.dto';

@Injectable()
export class BookmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 북마크 추가
  async create(userId: number, dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({
      data: {
        summary_id: dto.summary_id,
        user_id: userId,
      },
    });
  }

  // 북마크 삭제
  async delete(bookmarkId: number) {
    return this.prisma.bookmark.delete({
      where: {
        bookmark_id: bookmarkId,
      },
    });
  }

  // 사용자 기준 북마크 전체 조회
  async findAllByUser(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { user_id: userId },
      include: {
        summary: true, // 북마크한 요약 내용 같이 조회 (옵션)
      },
    });
  }

  // 특정 요약에 대한 북마크 조회
  async findOneByUserAndSummary(userId: number, summaryId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        user_id: userId,
        summary_id: summaryId,
      },
    });
  }
}
