import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BookmarkModel {
  // 찜 생성
  async createBookmark(summaryId: bigint) {
    return prisma.bookmark.create({
      data: {
        summary_id: summaryId,
      },
    });
  }

  // 찜 세부 목록 조회
  async getBookmark(bookmarkId: bigint) {
    return prisma.bookmark.findUnique({
      where: { bookmark_id: bookmarkId },
    });
  }

  // 모든 찜 목록 조회
  async getAllBookmarks() {
    return prisma.bookmark.findMany();
  }

  // 찜 삭제
  async deleteBookmark(bookmarkId: bigint) {
    return prisma.bookmark.delete({
      where: { bookmark_id: bookmarkId },
    });
  }
}
