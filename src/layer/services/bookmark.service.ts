import { Injectable, NotFoundException } from '@nestjs/common';
import { BookmarkRepository } from '../repositories/bookmark.repository';
import { CreateBookmarkDto } from '../dtos/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  // 북마크 추가
  async create(userId: number, dto: CreateBookmarkDto) {
    return this.bookmarkRepository.create(userId, dto);
  }

  // 북마크 삭제
  async delete(userId: number, summaryId: number) {
    const bookmark = await this.bookmarkRepository.findOneByUserAndSummary(userId, summaryId);
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return this.bookmarkRepository.delete(bookmark.bookmark_id);
  }

  // 전체 북마크 목록 (사용자 기준)
  async findAllByUser(userId: number) {
    return this.bookmarkRepository.findAllByUser(userId);
  }

  // 특정 요약 북마크 조회
  async findOneByUserAndSummary(userId: number, summaryId: number) {
    const bookmark = await this.bookmarkRepository.findOneByUserAndSummary(userId, summaryId);
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return bookmark;
  }
}